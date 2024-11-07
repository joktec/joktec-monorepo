import { ConfigService, Inject, LogService, OnModuleInit, sleep, toArray } from '@joktec/core';
import dayjs from 'dayjs';
import { flatten, isArray, isString, snakeCase, upperCase } from 'lodash';
import { FORMAT } from './job.constant';
import { JobModel, JobStatus } from './job.model';
import { JobQueue } from './job.queue';
import { IJobRepo } from './job.repo';
import { JobWorkerConfig } from './job.worker.config';

export abstract class JobWorker<JOB extends JobModel> implements OnModuleInit {
  @Inject() protected logService: LogService;
  @Inject() protected configService: ConfigService;

  private config: JobWorkerConfig;
  private jobQueue: JobQueue<JOB>;

  protected constructor(
    protected jobRepo: IJobRepo<JobModel, string>,
    private configKey: string,
  ) {
    this.logService.setContext(this.constructor.name);
  }

  async onModuleInit() {
    if (!this.getConfig().enable) return;
    await this.initJobQueue();
    await this.initJobs();
  }

  protected getConfig() {
    if (this.config) return this.config;
    this.config = this.configService.parse(JobWorkerConfig, this.configKey);
    this.logService.info('Config %j', this.config);
    return this.config;
  }

  protected async createNewJobs(date: string): Promise<JOB[]> {
    const type = upperCase(snakeCase(this.getConfig().type));
    return toArray({
      id: `${type}-${date}`,
      type,
      date,
      status: JobStatus.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
      data: {},
    } as JOB);
  }

  private async initJobQueue() {
    this.jobQueue = new JobQueue<JOB>(
      {
        consume: ([job]) => this.processJob(job),
        concurrent: this.getConfig().concurrent,
        batchSize: 1,
      },
      this.logService,
    );
  }

  private async processJob(job: JOB): Promise<void> {
    const canProcess = await this.isCanProcess(job);
    const nextJob: JOB = canProcess ? await this.process(job) : await this.reset(job);
    if (!canProcess) {
      await sleep(this.getConfig().resetTimeout);
    }

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
      const execTime = ((job.updatedAt.getTime() - job.createdAt.getTime()) / 1000 / 60).toFixed(2);
      this.logService.info(job, 'Job %s sis completed in %s minutes', job.id, execTime);
    }
  }

  private async processOnJobStartHook(job: JOB) {
    if (job.status == JobStatus.TODO) {
      job.createdAt = new Date();
      this.logService.info('Job %s - %s is started at %s', job.type, job.date, job.createdAt);
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
    if (!this.config.dependsOn) {
      return true;
    }

    const dependsOn: string[] = [];
    if (isString(this.config.dependsOn)) dependsOn.push(this.config.dependsOn);
    if (isArray(this.config.dependsOn)) dependsOn.push(...this.config.dependsOn);
    const runningJobs: JobModel[] = await this.jobRepo.find({
      condition: { date: job.date, type: { $in: dependsOn }, status: { $ne: JobStatus.DONE } },
      sort: { date: 'asc' },
    });
    const canProcess: boolean = runningJobs.length === 0;

    if (!canProcess) {
      const msg = `Unable to continue running job [%s]. This job will be restart after %s second(s)!`;
      const timeout = this.config.resetTimeout / 1000;
      this.logService.warn(msg, job.id, timeout);
    }

    return canProcess;
  }

  abstract process(job: JOB): Promise<JOB>;

  protected async reset(job: JOB): Promise<JOB> {
    return job;
  }

  protected getPrevDate(): string {
    return dayjs(new Date()).tz(this.config.timezone).subtract(1, 'day').endOf('day').format(FORMAT);
  }

  protected buildDateRange(): string[] {
    const fromDate = this.getConfig().fromDate || this.getPrevDate();
    const toDate = this.getConfig().toDate || fromDate;

    const start = dayjs(fromDate, FORMAT);
    const end = dayjs(toDate, FORMAT);
    const ranges = [];
    do {
      ranges.push(start.format(FORMAT));
      start.add(1, 'day');
    } while (start.isSameOrBefore(end, 'day'));
    return ranges;
  }

  protected async initJobs(): Promise<void> {
    const dateRange: string[] = this.buildDateRange();
    this.logService.info(`Prepare run job in date range: %j`, dateRange);
    await this.pushJobs(...dateRange);
    await this.drain(); // wait for jobs completed and exit the process
    process.exit(0);
  }

  protected async pushJobs(...dates: string[]) {
    // new jobs
    const newJobs = flatten(await Promise.all(dates.map(date => this.createNewJobs(date))));
    const currentJobs = await this.jobRepo.find({
      condition: { type: this.getConfig().type, id: { $in: newJobs.map(c => c.id) } },
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
    if (!runJobs.length) {
      this.logService.info('All jobs are done');
      process.exit(0);
    }
    this.jobQueue.push(runJobs);
  }

  async drain(): Promise<void> {
    await this.jobQueue.drain();
  }
}
