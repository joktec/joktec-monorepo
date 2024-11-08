import { ConfigService, getTimeString, Inject, LogService, OnModuleInit, sleep, toArray } from '@joktec/core';
import dayjs from 'dayjs';
import { flatten, isArray, isString, snakeCase, upperCase } from 'lodash';
import { FORMAT } from './job.constant';
import { IJobModel, JobStatus } from './job.model';
import { JobQueue } from './job.queue';
import { IJobRepo } from './job.repo';
import { JobWorkerConfig } from './job.worker.config';

export abstract class JobWorker<JOB extends IJobModel> implements OnModuleInit {
  @Inject() protected logService: LogService;
  @Inject() protected configService: ConfigService;

  private config: JobWorkerConfig;
  private jobQueue: JobQueue<JOB>;

  protected constructor(
    protected jobRepo: IJobRepo<IJobModel, string>,
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

    await this.initJobs();
  }

  protected getConfig() {
    if (this.config) return this.config;
    this.config = this.configService.parse(JobWorkerConfig, this.configKey);
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
      condition: { code: this.config.code, id: { $in: newJobs.map(c => c.id) } },
      sort: { date: 'asc' },
    });

    // merge with current jobs if startFromScratch === false
    for (const job of newJobs) {
      const currentJob = currentJobs.find(c => c.id === job.id);
      if (currentJob && !this.config.startFromScratch) {
        Object.assign(job, currentJob);
      }
    }

    // update new an existed jobs
    await this.jobRepo.bulkUpsert(newJobs, ['id']);
    const runJobs = newJobs.filter(c => c.status != JobStatus.DONE).sort(c => dayjs(c.date).unix());
    if (runJobs.length) this.jobQueue.push(runJobs);
    this.logService.info('All jobs are done');
    await this.onDone();
  }

  protected async createNewJobs(date: string): Promise<JOB[]> {
    const code = upperCase(snakeCase(this.config.code));
    return toArray({
      id: `${code}-${date}`,
      code,
      date,
      status: JobStatus.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
      data: {},
    } as JOB);
  }

  private async processJob(job: JOB): Promise<void> {
    const canProcess = await this.isCanProcess(job);
    const nextJob: JOB = canProcess ? await this.process(job) : await this.reset(job);
    if (!canProcess) await sleep(this.config.resetTimeout);

    await this.processOnJobStartHook(job);
    nextJob.updatedAt = new Date();
    await this.jobRepo.upsert(nextJob, ['id']);

    if (nextJob.status == JobStatus.DONE) {
      await this.processOnJobDoneHook(nextJob);
      return;
    }

    this.logService.info(job, 'Next job %s will be processed', job.id);
    this.jobQueue.unshift(nextJob);
  }

  private async processOnJobDoneHook(job: JOB) {
    if (job.status == JobStatus.DONE) {
      await this.onDoneHook(job);
      const execTime = job.updatedAt.getTime() - job.createdAt.getTime();
      this.logService.info(job, 'Job %s sis completed in %s', job.id, getTimeString(execTime));
    }
  }

  private async processOnJobStartHook(job: JOB) {
    if (job.status == JobStatus.TODO) {
      job.createdAt = new Date();
      this.logService.info('Job %s - %s is started at %s', job.code, job.date, job.createdAt);
      job.status = JobStatus.IN_PROGRESS;
      await this.onStartHook(job);
    }
  }

  protected async onStartHook(job: JOB): Promise<void> {
    this.logService.info('On start hook for job: %s', job.id);
    return;
  }

  protected async onDoneHook(job: JOB): Promise<void> {
    this.logService.info('On done hook for job: %s', job.id);
    return;
  }

  protected async isCanProcess(job: JOB): Promise<boolean> {
    if (!this.config.dependsOn?.length) {
      return true;
    }

    const dependsOn: string[] = [];
    if (isString(this.config.dependsOn)) dependsOn.push(this.config.dependsOn);
    if (isArray(this.config.dependsOn)) dependsOn.push(...this.config.dependsOn);
    const runningJobs: IJobModel[] = await this.jobRepo.find({
      condition: { date: job.date, code: { $in: dependsOn }, status: { $ne: JobStatus.DONE } },
      sort: { date: 'asc' },
    });
    const canProcess: boolean = runningJobs.length === 0;

    if (!canProcess) {
      const msg = `Unable to continue running job [%s]. This job will be restart after %s!`;
      this.logService.warn(msg, job.id, getTimeString(this.config.resetTimeout));
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

  async drain(): Promise<void> {
    await this.jobQueue.drain();
  }

  protected async onDone() {
    if (this.config.exitOnDone) {
      process.exit(0);
    }
  }
}
