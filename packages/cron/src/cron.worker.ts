import { ConfigService, Inject, LogService, OnModuleInit, sleep, toArray } from '@joktec/core';
import { flatten, isArray, isString, snakeCase, upperCase } from 'lodash';
import moment from 'moment-timezone';
import { CronQueue } from './cron.queue';
import { CronRepo } from './cron.repo';
import { CronWorkerConfig } from './cron.worker.config';
import { CronModel, CronStatus } from './models';

const FORMAT = 'YYYY-MM-DD';

export abstract class CronWorker<C extends CronModel> implements OnModuleInit {
  @Inject() protected logService: LogService;
  @Inject() protected configService: ConfigService;
  @Inject() private cronRepo: CronRepo;

  private config: CronWorkerConfig;
  private cronQueue: CronQueue<CronModel>;

  protected constructor(
    private context: string,
    private configKey: string,
  ) {}

  onModuleInit() {
    if (!this.getConfig().enable) return;
    this.initCronQueue();
    this.initCrons().then();
  }

  protected getConfig() {
    if (this.config) return this.config;
    this.config = new CronWorkerConfig(this.configService.get<CronWorkerConfig>(this.configKey as any));
    this.logService.info('Config %s', JSON.stringify(this.config, null, 2));
    return this.config;
  }

  protected async createNewCrons(date: string): Promise<C[]> {
    const type = upperCase(snakeCase(this.getConfig().type));
    return toArray({
      id: `${type}-${date}`,
      type,
      date,
      status: CronStatus.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
      data: {},
    } as C);
  }

  private initCronQueue() {
    this.cronQueue = new CronQueue<C>(
      {
        consume: ([cron]) => this.processCron(cron),
        concurrent: this.getConfig().concurrent,
        batchSize: 1,
      },
      `${this.context}CronQueue`,
    );
  }

  private async processCron(cron: C): Promise<void> {
    const canProcess = await this.isCanProcess(cron);
    const nextCron: C = canProcess ? await this.process(cron) : await this.reset(cron);
    if (!canProcess) {
      await sleep(this.getConfig().resetTimeout);
    }

    await this.processOnCronStartHook(cron);
    nextCron.updatedAt = new Date();
    await this.cronRepo.upsert({}, nextCron);

    if (nextCron.status == CronStatus.DONE) {
      await this.processOnCronDoneHook(nextCron);
      return;
    }

    this.logService.info(cron, 'Next cron %s will be processed', cron.id);
    this.cronQueue.unshift(nextCron);
  }

  private async processOnCronDoneHook(cron: C) {
    if (cron.status == CronStatus.DONE) {
      await this.onDoneHook(cron);
      const execTime = ((cron.updatedAt.getTime() - cron.createdAt.getTime()) / 1000 / 60).toFixed(2);
      this.logService.info(cron, 'Cron %s sis completed in %s minutes', cron.id, execTime);
    }
  }

  private async processOnCronStartHook(cron: C) {
    if (cron.status == CronStatus.TODO) {
      cron.createdAt = new Date();
      this.logService.info('Cron %s - %s is started at %s', cron.type, cron.date, cron.createdAt);
      cron.status = CronStatus.IN_PROGRESS;
      await this.onStartHook(cron);
    }
  }

  protected async onStartHook(cron: C): Promise<void> {
    this.logService.info('On start hook for cron: %s', cron.id);
    return;
  }

  protected async onDoneHook(cron: C): Promise<void> {
    this.logService.info('On done hook for cron: %s', cron.id);
    return;
  }

  protected async isCanProcess(cron: C): Promise<boolean> {
    if (!this.config.dependsOn) {
      return true;
    }

    const dependsOn: string[] = [];
    if (isString(this.config.dependsOn)) dependsOn.push(this.config.dependsOn);
    if (isArray(this.config.dependsOn)) dependsOn.push(...this.config.dependsOn);
    const runningCrons: CronModel[] = await this.cronRepo.getDependCrons(dependsOn, cron.date);
    const canProcess: boolean = runningCrons.length === 0;

    if (!canProcess) {
      const msg = `Unable to continue running cron [%s]. This cron will be restart after %s second(s)!`;
      const timeout = this.config.resetTimeout / 1000;
      this.logService.warn(msg, cron.id, timeout);
    }

    return canProcess;
  }

  abstract process(cron: C): Promise<C>;

  protected async reset(cron: C): Promise<C> {
    return cron;
  }

  protected getPrevDate() {
    return moment(new Date()).tz('Asia/Ho_Chi_Minh').subtract(1, 'day').endOf('day').format(FORMAT);
  }

  protected buildDateRange(): string[] {
    const fromDate = this.getConfig().fromDate || this.getPrevDate();
    const toDate = this.getConfig().toDate || fromDate;

    const start = moment(fromDate, FORMAT);
    const end = moment(toDate, FORMAT);
    const ranges = [];
    do {
      ranges.push(start.format(FORMAT));
      start.add(1, 'day');
    } while (start.isSameOrBefore(end, 'day'));
    return ranges;
  }

  protected async initCrons(): Promise<void> {
    const dateRange: string[] = this.buildDateRange();
    this.logService.info(`Prepare run cron in date range: %j`, dateRange);
    await this.pushCrons(...dateRange);
    await this.drain(); // wait for crons completed and exit the process
    process.exit(0);
  }

  protected async pushCrons(...dates: string[]) {
    // new crons
    const newCrons = flatten(await Promise.all(dates.map(date => this.createNewCrons(date))));
    const currentCrons = await this.cronRepo.getCrons(
      this.getConfig().type,
      newCrons.map(c => c.id),
    );

    // merge with current crons if startFromScratch === false
    for (const cron of newCrons) {
      const currentCron = currentCrons.find(c => c.id === cron.id);
      if (currentCron && !this.config.startFromScratch) {
        Object.assign(cron, currentCron);
      }
    }

    // update new an existed crons
    await this.cronRepo.bulkCreate(newCrons);
    const runCrons = newCrons.filter(c => c.status != CronStatus.DONE).sort(c => moment(c.date).unix());
    if (!runCrons.length) {
      this.logService.info('All crons are done');
      process.exit(0);
    }
    this.cronQueue.push(runCrons);
  }

  async drain(): Promise<void> {
    await this.cronQueue.drain();
  }
}
