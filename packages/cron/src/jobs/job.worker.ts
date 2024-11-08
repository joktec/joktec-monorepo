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
import { flatten, isArray, isString, snakeCase, merge } from 'lodash';
import { FORMAT } from './job.constant';
import { IJobModel, JobStatus } from './job.model';
import { JobQueue } from './job.queue';
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
    const config = this.getConfig();
    if (!config.enable) return;

    this.jobQueue = new JobQueue<JOB>(
      {
        consume: ([job]) => this.processJob(job),
        concurrent: this.config.concurrent,
        batchSize: this.config.batchSize,
        maxRetries: this.config.maxRetries,
        retryTimeout: this.config.retryTimeout,
      },
      this.logService,
    );

    if (config.initOnStart) await this.initJobs();
  }

  protected getConfig() {
    if (this.config) return this.config;
    this.config = this.configService.parse(this.configClass, this.configKey);
    this.logService.info('Config %j', this.config);
    return this.config;
  }

  protected async initJobs(): Promise<void> {
    const dateRange: string[] = this.buildDateRange();
    this.logService.info(`Prepare run job in date range: %j`, dateRange);
    await this.pushJobs(...dateRange);
    await this.drain(); // wait for jobs completed and exit the process
    await this.onDone();
  }

  protected async pushJobs(...dates: string[]) {
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
        return merge({}, newJob, currentJob);
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

    this.logService.info('All jobs are done');
    await this.onDone();
  }

  protected async createNewJobs(date: string): Promise<JOB[]> {
    const type = snakeCase(this.config.type).toUpperCase();
    return toArray({
      code: `${type}-${date}`,
      type,
      date,
      status: JobStatus.TODO,
      startedAt: new Date(),
      finishedAt: new Date(),
      data: {},
    } as JOB);
  }

  private async processJob(job: JOB): Promise<void> {
    const canProcess = await this.isCanProcess(job);
    const nextJob: JOB = canProcess ? await this.process(job) : await this.reset(job);
    if (!canProcess) await sleep(this.config.resetTimeout);

    await this.processOnJobStartHook(job);
    nextJob.finishedAt = new Date();
    await this.jobRepo.upsert(nextJob, ['code']);

    if (nextJob.status == JobStatus.DONE) {
      await this.processOnJobDoneHook(nextJob);
      return;
    }

    this.logService.info('Next job %s will be processed %j', job.code, job);
    this.jobQueue.unshift(nextJob);
  }

  private async processOnJobDoneHook(job: JOB) {
    if (job.status == JobStatus.DONE) {
      await this.onDoneHook(job);
      const execTime = job.finishedAt.getTime() - job.startedAt.getTime();
      this.logService.info(job, 'Job %s sis completed in %s', job.code, getTimeString(execTime));
    }
  }

  private async processOnJobStartHook(job: JOB) {
    if (job.status == JobStatus.TODO) {
      job.startedAt = new Date();
      this.logService.info('Job %s - %s is started at %s', job.type, job.date, job.startedAt);
      job.status = JobStatus.IN_PROGRESS;
      await this.onStartHook(job);
    }
  }

  protected async onStartHook(job: JOB): Promise<void> {
    this.logService.info('On start hook for job: %s', job.code);
    return;
  }

  protected async onDoneHook(job: JOB): Promise<void> {
    this.logService.info('On done hook for job: %s', job.code);
    return;
  }

  protected async isCanProcess(job: JOB): Promise<boolean> {
    if (!this.config.dependsOn?.length) {
      return true;
    }

    const dependsOn: string[] = [];
    if (isString(this.config.dependsOn)) dependsOn.push(this.config.dependsOn);
    if (isArray(this.config.dependsOn)) dependsOn.push(...this.config.dependsOn);
    const runningJobs = await this.jobRepo.find({
      condition: { date: job.date, type: { $in: dependsOn }, status: { $ne: JobStatus.DONE } },
      sort: { date: 'asc' },
    });
    const canProcess: boolean = runningJobs.length === 0;

    if (!canProcess) {
      const msg = `Unable to continue running job [%s]. This job will be restart after %s!`;
      this.logService.warn(msg, job.code, getTimeString(this.config.resetTimeout));
    }

    return canProcess;
  }

  abstract process(job: JOB): Promise<JOB>;

  protected async reset(job: JOB): Promise<JOB> {
    return job;
  }

  protected buildDateRange(): string[] {
    const fromDate = this.config.fromDate || dayjs().tz(this.config.timezone).endOf('days').toDate();
    const toDate = this.config.toDate || fromDate;

    const start = dayjs(fromDate);
    const end = dayjs(toDate);
    const ranges = [];
    do {
      ranges.push(start.format(FORMAT));
      start.add(1, 'day');
    } while (start.isSameOrBefore(end, 'day'));
    return ranges;
  }

  protected async drain(): Promise<void> {
    await this.jobQueue.drain();
  }

  protected async onDone() {
    if (this.config.exitOnDone) {
      process.exit(0);
    }
  }
}
