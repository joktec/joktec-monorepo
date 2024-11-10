import {
  ConfigService,
  Constructor,
  getTimeString,
  Inject,
  LogService,
  OnModuleInit,
  sleep,
  toArray,
} from '@joktec/core';
import dayjs from 'dayjs';
import { flatten, merge } from 'lodash';
import { IJobModel, JobStatus } from './job.model';
import { JobQueue, QueueConfig } from './job.queue';
import { IJobRepo } from './job.repo';
import { JobWorkerConfig } from './job.worker.config';

export abstract class JobWorker<
  JOB extends IJobModel<DATA>,
  DATA extends object = Record<string, any>,
  CONFIG extends JobWorkerConfig = JobWorkerConfig,
> implements OnModuleInit
{
  @Inject() protected logService: LogService;
  @Inject() protected configService: ConfigService;

  private config: CONFIG;
  private jobQueue: JobQueue<JOB>;

  protected constructor(
    protected jobRepo: IJobRepo<IJobModel<DATA>, string>,
    protected configClass: Constructor<CONFIG>,
    private configKey: string,
  ) {}

  async onModuleInit() {
    this.logService.setContext(this.constructor.name);
    this.config = this.getConfig();
    await this.initQueue();

    if (!this.config.enable) return;
    if (this.config.autoStart) await this.initJobs();
  }

  /**
   * Retrieves the worker's configuration.
   * @returns The loaded configuration of type CONFIG.
   */
  protected getConfig(): CONFIG {
    if (this.config) return this.config;
    this.config = this.configService.parse(this.configClass, this.configKey);
    this.logService.debug('Config %j', this.config);
    return this.config;
  }

  /**
   * Initializes the job queue with specific configurations.
   */
  protected async initQueue(): Promise<void> {
    const queueConfig: QueueConfig<JOB> = {
      consume: ([job]) => this.processJob(job),
      concurrent: this.config.concurrent,
      batchSize: this.config.batchSize,
      maxRetries: this.config.maxRetries,
      retryTimeout: this.config.retryTimeout,
    };
    this.jobQueue = new JobQueue<JOB>(queueConfig, this.logService);
  }

  /**
   * Initializes and runs jobs based on the specified date range.
   */
  protected async initJobs(): Promise<void> {
    const dateRange: string[] = this.config.dateRange;
    this.logService.info(`Prepare run job in date range: %j`, dateRange);
    await this.pushJobs(...dateRange);
    await this.jobQueue.drain(); // wait for jobs completed and exit the process
    await this.onCompleted();
  }

  /**
   * Pushes jobs to the queue based on the given dates.
   * @param dates - Array of dates to create jobs for.
   */
  protected async pushJobs(...dates: string[]): Promise<void> {
    // new jobs
    const newJobs = flatten(await Promise.all(dates.map(date => this.createNewJobs(date))));
    const currentJobs = await this.jobRepo.find({
      condition: { type: this.config.type, code: { $in: newJobs.map(c => c.code) } },
      sort: { date: 'asc' },
    });

    // merge with current jobs if startFromScratch === false
    const updatedJobs = newJobs.map(newJob => {
      const currentJob = currentJobs.find(currJob => currJob.code === newJob.code);
      if (currentJob && !this.config.startFromScratch) {
        const result = merge({}, newJob, currentJob);
        result.data = JSON.parse(JSON.stringify(currentJob.data));
        return result;
      }
      return newJob;
    });

    // update new an existed jobs
    await this.jobRepo.bulkUpsert(updatedJobs, ['code']);
    const runJobs = updatedJobs.filter(c => c.status !== JobStatus.DONE).sort(c => dayjs(c.date).unix());
    if (runJobs.length) {
      this.jobQueue.push(runJobs);
      this.logService.info('Prepare %s jobs to running', runJobs.length);
      return;
    }
  }

  /**
   * Creates new jobs for the specified date.
   * @param date - Date for which new jobs are created.
   * @returns A promise resolving to an array of created jobs.
   */
  protected async createNewJobs(date: string): Promise<JOB[]> {
    const type = this.config.type;
    return toArray({
      code: `${type}-${date}`,
      type,
      date,
      startedAt: new Date(),
      finishedAt: new Date(),
      data: {},
      status: JobStatus.TODO,
    } as JOB);
  }

  /**
   * Invoked when a job starts.
   * @param job - The job that has started.
   */
  protected async onStart(job: JOB): Promise<void> {
    return;
  }

  /**
   * Processes a job by updating its status, checking conditions, and handling completion.
   * @param job - The job to process.
   */
  private async processJob(job: JOB): Promise<void> {
    if (job.status === JobStatus.TODO) {
      job.startedAt = new Date();
      job.status = JobStatus.IN_PROGRESS;
      this.logService.info('Job %s - %s is started at %s', job.type, job.date, job.startedAt);
      await this.onStart(job);
    }

    const canProcess = await this.canProcess(job);
    if (!canProcess) {
      const msg = `Unable to continue running job [%s]. This job will be restart after %s!`;
      this.logService.warn(msg, job.code, getTimeString(this.config.resetTimeout));
      await sleep(this.config.resetTimeout);
    }

    const nextJob: JOB = await (canProcess ? this.process(job) : this.reset(job));
    nextJob.finishedAt = new Date();
    await this.jobRepo.upsert(nextJob, ['code']);

    if (nextJob.status === JobStatus.DONE) {
      const execTime = job.finishedAt.getTime() - job.startedAt.getTime();
      this.logService.info(job, 'Job %s sis completed in %s', job.code, getTimeString(execTime));
      await this.onDone(job);
      return;
    }

    this.logService.info('Next job %s will be processed %j', job.code, job);
    this.jobQueue.unshift(nextJob);
  }

  /**
   * Checks if the job can proceed based on dependencies.
   * @param job - The job to check.
   * @returns A boolean indicating if the job can proceed.
   */
  protected async canProcess(job: JOB): Promise<boolean> {
    const dependsOn: string[] = toArray<string>(this.config.dependsOn);
    if (!dependsOn.length) return true;

    const runningJobs = await this.jobRepo.count({
      condition: { date: job.date, type: { $in: dependsOn }, status: { $ne: JobStatus.DONE } },
    });
    return runningJobs === 0;
  }

  /**
   * Abstract method to define job-specific processing logic.
   * @param job - The job to process.
   * @returns A promise resolving to the processed job.
   */
  abstract process(job: JOB): Promise<JOB>;

  /**
   * Resets a job if it cannot be processed.
   * @param job - The job to reset.
   * @returns A promise resolving to the reset job.
   */
  protected async reset(job: JOB): Promise<JOB> {
    return job;
  }

  /**
   * Invoked when a job completes successfully.
   * @param job - The job that completed.
   */
  protected async onDone(job: JOB): Promise<void> {
    return;
  }

  /**
   * Invoked when all jobs of a specific type are completed.
   */
  protected async onCompleted() {
    this.logService.info('All jobs of type %s are done', this.config.type);
    if (this.config.autoExit) {
      process.exit(0);
    }
  }
}
