import {
  BadRequestException,
  ConfigService,
  Exception,
  getTimeString,
  Inject,
  LogService,
  ModuleRef,
  OnModuleInit,
  sleep,
  toInt,
} from '@joktec/core';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob, CronJobParams } from 'cron';
import { isValidCron } from 'cron-validator';
import { get, map } from 'lodash';
import { CrontabConfig } from './crontab.config';
import {
  CrontabHistoryStatus,
  CrontabHistoryType,
  CrontabStatus,
  ICrontabHistoryModel,
  ICrontabMeta,
  ICrontabModel,
} from './models';
import { ICrontabHistoryRepo, ICrontabRepo } from './crontab.repo';

export abstract class CrontabScheduler implements OnModuleInit {
  private config: CrontabConfig;
  private cronMeta: { [key: string]: ICrontabMeta } = global.AllCronMetadata;

  @Inject() private readonly moduleRef: ModuleRef;
  @Inject() private readonly configService: ConfigService;
  @Inject() private readonly logService: LogService;
  @Inject() private readonly schedulerRegistry: SchedulerRegistry;

  protected constructor(
    protected cronRepo: ICrontabRepo<ICrontabModel, string>,
    protected cronHistoryRepo: ICrontabHistoryRepo<ICrontabHistoryModel, string>,
    private configKey: string = 'crontab',
  ) {}

  async onModuleInit() {
    this.logService.setContext(this.constructor.name);
    if (!this.getConfig().enable) return;

    const initIdleTimeout = this.config.initIdleTimeout;
    this.logService.info(`Crontab will be init after ${getTimeString(initIdleTimeout)}`);
    setTimeout(() => this.initProcess(), initIdleTimeout);
  }

  protected getConfig() {
    if (this.config) return this.config;
    this.config = this.configService.parseOrThrow(CrontabConfig, this.configKey);
    this.logService.info('Config %j', this.config);
    return this.config;
  }

  protected async initProcess() {
    this.logService.info('Start process to init Crontab');

    // Save all cron into database
    const insertCrons = Object.values(this.cronMeta).map(meta => ({
      ...meta.cron,
      timezone: meta.cron.timezone || this.config.timezone,
      expression: this.getAndValidExpression(meta.cron.expression),
    }));
    await this.cronRepo.bulkUpsert(insertCrons, ['code']);

    // Remove crons not exist in definition
    const cronNames = Object.keys(this.cronMeta);
    const disableCrons = await this.cronRepo.find({ condition: { code: { $nin: cronNames } } });
    if (disableCrons.length) {
      await Promise.all([
        this.cronHistoryRepo.deleteMany({ cronId: { $in: map(disableCrons, 'id') } }),
        this.cronRepo.deleteMany({ id: { $in: map(disableCrons, 'id') } }),
      ]);
    }

    // Query and start cronjob
    const crons = await this.cronRepo.find({ condition: { status: CrontabStatus.ACTIVATED } });
    crons.map(cron => this.startCron(cron));
  }

  protected validate(expression: string): boolean {
    return isValidCron(expression, { seconds: true, alias: true, allowBlankDay: true, allowSevenAsSunday: true });
  }

  protected getAndValidExpression(cronExpression: string): string {
    if (!cronExpression) return null;
    if (this.validate(cronExpression)) return cronExpression;

    const isConfigPath = cronExpression.includes('.');
    if (isConfigPath) {
      const cfgExpression = this.configService.get<string>(cronExpression, null);
      if (cfgExpression && this.validate(cfgExpression)) return cfgExpression;
    }

    const isEnvVar = cronExpression.match(/^[A-Z_]+$/);
    if (isEnvVar) {
      const envExpression = process.env[cronExpression];
      if (envExpression && this.validate(envExpression)) return envExpression;
    }

    throw new BadRequestException(`Cron expression '${cronExpression}' is invalid.`);
  }

  async refreshOne(cron: ICrontabModel) {
    cron.status === CrontabStatus.ACTIVATED && this.startCron(cron, true).catch();
    cron.status === CrontabStatus.DISABLED && this.stopCron(cron).catch();
    return { success: true };
  }

  async refreshAllCrons() {
    const crons = await this.cronRepo.find({});
    crons.map(cron => {
      cron.status === CrontabStatus.ACTIVATED && this.startCron(cron, true);
      cron.status === CrontabStatus.DISABLED && this.stopCron(cron);
    });
    return { success: true };
  }

  async startCron(cron: ICrontabModel, restart: boolean = false) {
    const cronName = `${this.config.prefix}:${cron.code}`;
    const jobExist = this.schedulerRegistry.doesExist(cron.type, cronName);
    if (jobExist) {
      if (!restart) return;
      await this.stopCron(cron);
    }

    const serviceClazz = this.cronMeta[cron.code].service;
    const serviceInstance = this.moduleRef.get(serviceClazz, { strict: false });
    if (!serviceInstance) {
      this.logService.warn(`Service %s not found. Job %s initialize failed.`, cron.serviceName, cronName);
      await this.cronRepo.update(cron.id, { status: CrontabStatus.DISABLED });
      return;
    }

    const method = serviceInstance[cron.methodName];
    if (!method) {
      const msg = `Method %s not found in service %s. Job %s initialize failed.`;
      this.logService.warn(msg, cron.methodName, cron.serviceName, cronName);
      await this.cronRepo.update(cron.id, { status: CrontabStatus.DISABLED });
      return;
    }

    const onTick = async () => {
      this.logService.info('Start to execute CronJob %s', cron.code);
      const timeout = toInt(cron.timeout, 0);
      if (timeout > 0) await sleep(timeout);

      let cronRes: any = null;
      let cronStatus: CrontabHistoryStatus;
      let cronError: any = null;

      try {
        cronRes = await method.call(serviceInstance);
        cronStatus = CrontabHistoryStatus.COMPLETED;
      } catch (err) {
        cronError = err;
        if (err instanceof Exception) {
          cronError = { ...err.getError(), stack: err.stack };
        }
        cronStatus = CrontabHistoryStatus.FAILED;
        if (this.cronMeta[cron.code].verbose) {
          this.logService.error(err, 'Error when executing CronJob %s', cron.code);
        }
      }

      const lastExecution = this.schedulerRegistry.getCronJob(cronName).lastDate();
      const nextExecution = this.schedulerRegistry.getCronJob(cronName).nextDate().toJSDate();
      const finishedAt = new Date();

      await this.cronRepo.update(cron.id, { lastExecution, nextExecution });
      this.isSaveHistory(cron.code, cronStatus) &&
        (await this.cronHistoryRepo.create({
          cronId: cron.id,
          type: CrontabHistoryType.AUTOMATIC,
          snapshot: cron.snapshot(),
          executedAt: lastExecution,
          finishedAt,
          duration: getTimeString(finishedAt.getTime() - lastExecution.getTime()),
          status: cronStatus,
          res: cronRes ? { data: cronRes } : null,
          error: cronError ? { msg: cronError.message, stack: cronError.stack } : null,
        }));
      this.logService.info('End to execute CronJob %s', cron.code);
    };

    const onComplete = null;
    const onStart: CronJobParams<any, any>['start'] = false;
    const cronTime = cron.cronDate || cron.expression;
    const description: string = get(cron, 'title') || 'No description';
    const job = new CronJob(cronTime, onTick, onComplete, onStart, cron.timezone || undefined);
    this.schedulerRegistry.addCronJob(cronName, job as any);
    job.start();
    if (cron.cronDate) {
      this.logService.info(`Job %s added and will be run at %s (%s)`, cron.code, job.nextDate(), description);
    } else {
      const msg = `Job %s added with expression %s (%s). The first job will be execute at %s (%s)`;
      this.logService.info(msg, cron.code, cron.expression, cron.timezone, job.nextDate(), description);
    }
  }

  async stopCron(cron: ICrontabModel) {
    const cronName = `${this.config.prefix}:${cron.code}`;
    const jobExist = this.schedulerRegistry.doesExist(cron.type, cronName);
    if (!jobExist) return;

    const job = this.schedulerRegistry.getCronJob(cronName);
    if (job.running) job.stop();
    this.schedulerRegistry.deleteCronJob(cronName);
    this.logService.info(`Job %s stopped`, cron.code);
  }

  async trigger(cronId: string, waiting: boolean = false): Promise<{ success: boolean; message?: string }> {
    const cron = await this.cronRepo.findOne(cronId);
    const serviceClazz = this.cronMeta[cron.code].service;
    const serviceInstance = this.moduleRef.get(serviceClazz, { strict: false });
    if (!serviceInstance) {
      const msg = `Service ${cron.serviceName} not found. Job ${cron.code} trigger failed.`;
      this.logService.warn(msg);
      await this.cronRepo.update(cron.id, { status: CrontabStatus.DISABLED });
      return { success: false, message: msg };
    }

    const method = serviceInstance[cron.methodName];
    if (!method) {
      const msg = `Method ${cron.methodName} not found in service ${cron.serviceName}. Job ${cron.code} trigger failed.`;
      this.logService.warn(msg);
      await this.cronRepo.update(cron.id, { status: CrontabStatus.DISABLED });
      return { success: false, message: msg };
    }

    const onTick = async () => {
      this.logService.info('Start to trigger CronJob %s', cron.code);
      const timeout = toInt(cron.timeout, 0);
      if (timeout > 0) await sleep(timeout);

      const lastExecution = new Date();
      let cronRes: any = null;
      let cronStatus: CrontabHistoryStatus;
      let cronError: any = null;

      try {
        cronRes = await method.call(serviceInstance);
        cronStatus = CrontabHistoryStatus.COMPLETED;
      } catch (err) {
        cronError = err;
        cronStatus = CrontabHistoryStatus.FAILED;
      }

      const finishedAt = new Date();
      await this.cronRepo.update(cron.id, { lastExecution });
      this.isSaveHistory(cron.code, cronStatus) &&
        (await this.cronHistoryRepo.create({
          cronId: cron.id,
          type: CrontabHistoryType.MANUAL,
          snapshot: cron.snapshot(),
          executedAt: lastExecution,
          finishedAt,
          duration: getTimeString(finishedAt.getTime() - lastExecution.getTime()),
          status: cronStatus,
          res: cronRes ? { data: cronRes } : null,
          error: cronError ? { msg: cronError.message, stack: cronError.stack } : null,
        }));
      this.logService.info('End to trigger CronJob %s', cron.code);
    };

    try {
      waiting ? await onTick() : onTick().then();
    } catch (err) {
      throw new BadRequestException(err);
    }

    return { success: true };
  }

  private isSaveHistory(code: string, cronStatus: CrontabHistoryStatus): boolean {
    const trace = this.cronMeta[code].trace;
    return !trace || trace === 'all' || (trace === 'error' && cronStatus === CrontabHistoryStatus.FAILED);
  }
}
