import {
  Injectable,
  LogService,
  OnModuleInit,
  sleep,
  toInt,
  ModuleRef,
  getTimeString,
  BadRequestException,
} from '@joktec/core';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob, CronJobParams } from 'cron';
import { get, map } from 'lodash';
import { ICronMeta, SuccessResponse } from '../../common';
import { CronHistoryStatus, CronHistoryType, CronStatus } from '../../models/constants';
import { CronSchema } from '../../models/schemas';
import { CronHistoryRepo, CronRepo } from '../../repositories';
import { CRON_INIT_TIMEOUT, CRON_NAME_PREFIX } from './cron.constant';

@Injectable()
export class CronScheduler implements OnModuleInit {
  private cronMeta: { [key: string]: ICronMeta } = global.AllCronMetadata;

  constructor(
    private moduleRef: ModuleRef,
    private logService: LogService,
    private schedulerRegistry: SchedulerRegistry,
    private cronRepo: CronRepo,
    private cronHistoryRepo: CronHistoryRepo,
  ) {
    this.logService.setContext(CronScheduler.name);
  }

  async onModuleInit() {
    setTimeout(this.initProcess.bind(this), CRON_INIT_TIMEOUT);
  }

  async initProcess() {
    this.logService.info('Start process to init CronJob');

    // Save all cron into database
    const insertCrons = Object.values(this.cronMeta).map(meta => meta.cron);
    await this.cronRepo.bulkUpsert(insertCrons, ['title']);

    // Remove crons not exist in definition
    const cronNames = Object.keys(this.cronMeta);
    const disableCrons = await this.cronRepo.find({ condition: { title: { $nin: cronNames } } });
    await Promise.all([
      this.cronRepo.deleteMany({ _id: { $in: map(disableCrons, '_id') } }, { force: true }),
      this.cronHistoryRepo.deleteMany({ cronId: { $in: map(disableCrons, '_id') } }, { force: true }),
    ]);

    // Query and start cronjob
    const crons = await this.cronRepo.find({ condition: { status: CronStatus.ACTIVATED } });
    crons.map(cron => this.startCron(cron));
  }

  async refreshOne(cron: CronSchema) {
    cron.status === CronStatus.ACTIVATED && this.startCron(cron, true).catch();
    cron.status === CronStatus.DISABLED && this.stopCron(cron).catch();
    return { success: true };
  }

  async refreshAllCrons() {
    const crons = await this.cronRepo.find({});
    crons.map(cron => {
      cron.status === CronStatus.ACTIVATED && this.startCron(cron, true);
      cron.status === CronStatus.DISABLED && this.stopCron(cron);
    });
    return { success: true };
  }

  async startCron(cron: CronSchema, restart: boolean = false) {
    const cronName = `${CRON_NAME_PREFIX}:${cron.title}`;
    const jobExist = this.schedulerRegistry.doesExist(cron.type, cronName);
    if (jobExist) {
      if (!restart) return;
      await this.stopCron(cron);
    }

    const serviceClazz = this.cronMeta[cron.title].service;
    const serviceInstance = this.moduleRef.get(serviceClazz, { strict: false });
    if (!serviceInstance) {
      this.logService.warn(`Service %s not found. Job %s initialize failed.`, cron.serviceName, cronName);
      await this.cronRepo.update(cron._id, { status: CronStatus.DISABLED });
      return;
    }

    const method = serviceInstance[cron.methodName];
    if (!method) {
      this.logService.warn(
        `Method %s not found in service %s. Job %s initialize failed.`,
        cron.methodName,
        cron.serviceName,
        cronName,
      );
      await this.cronRepo.update(cron._id, { status: CronStatus.DISABLED });
      return;
    }

    const onTick = async () => {
      this.logService.info('Start to execute CronJob %s', cron.title);
      const timeout = toInt(cron.timeout, 0);
      if (timeout > 0) await sleep(timeout);

      let cronRes: any = null;
      let cronStatus: CronHistoryStatus;
      let cronError: any = null;

      try {
        cronRes = await method.call(serviceInstance);
        cronStatus = CronHistoryStatus.COMPLETED;
      } catch (err) {
        cronError = err;
        cronStatus = CronHistoryStatus.FAILED;
      }

      const lastExecution = this.schedulerRegistry.getCronJob(cronName).lastDate();
      const nextExecution = this.schedulerRegistry.getCronJob(cronName).nextDate().toJSDate();
      const finishedAt = new Date();
      await Promise.all([
        this.cronRepo.update(cron._id, { lastExecution, nextExecution }),
        this.cronHistoryRepo.create({
          cronId: cron._id,
          type: CronHistoryType.AUTOMATIC,
          snapshot: cron.snapshot,
          executedAt: lastExecution,
          finishedAt,
          duration: getTimeString(finishedAt.getTime() - lastExecution.getTime()),
          status: cronStatus,
          res: cronRes ? { data: cronRes } : null,
          error: cronError ? { msg: cronError.message, stack: cronError.stack } : null,
        }),
      ]);
      this.logService.info('End to execute CronJob %s', cron.title);
    };

    const onComplete = null;
    const onStart: CronJobParams<any, any>['start'] = false;
    const cronTime = cron.cronDate ? cron.cronDate : cron.expression;
    const description = get(cron, ['subhead'], 'No description');
    const job = new CronJob(cronTime, onTick, onComplete, onStart, cron.timezone || undefined);
    this.schedulerRegistry.addCronJob(cronName, job);
    job.start();
    this.logService.info(`Job ${cron.title} added with expression ${job.nextDate()} (${description})`);
  }

  async stopCron(cron: CronSchema) {
    const cronName = `${CRON_NAME_PREFIX}:${cron.title}`;
    const jobExist = this.schedulerRegistry.doesExist(cron.type, cronName);
    if (!jobExist) return;

    const job = this.schedulerRegistry.getCronJob(cronName);
    if (job.running) job.stop();
    this.schedulerRegistry.deleteCronJob(cronName);
    this.logService.info(`Job ${cron.title} stopped`);
  }

  async trigger(cronId: string, waiting: boolean = false): Promise<SuccessResponse> {
    const cron = await this.cronRepo.findOne(cronId);
    const serviceClazz = this.cronMeta[cron.title].service;
    const serviceInstance = this.moduleRef.get(serviceClazz, { strict: false });
    if (!serviceInstance) {
      const msg = `Service ${cron.serviceName} not found. Job ${cron.title} trigger failed.`;
      this.logService.warn(msg);
      await this.cronRepo.update(cron._id, { status: CronStatus.DISABLED });
      return { success: false, message: msg };
    }

    const method = serviceInstance[cron.methodName];
    if (!method) {
      const msg = `Method ${cron.methodName} not found in service ${cron.serviceName}. Job ${cron.title} trigger failed.`;
      this.logService.warn(msg);
      await this.cronRepo.update(cron._id, { status: CronStatus.DISABLED });
      return { success: false, message: msg };
    }

    const onTick = async () => {
      this.logService.info('Start to trigger CronJob %s', cron.title);
      const timeout = toInt(cron.timeout, 0);
      if (timeout > 0) await sleep(timeout);

      const lastExecution = new Date();
      let cronRes: any = null;
      let cronStatus: CronHistoryStatus;
      let cronError: any = null;

      try {
        cronRes = await method.call(serviceInstance);
        cronStatus = CronHistoryStatus.COMPLETED;
      } catch (err) {
        cronError = err;
        cronStatus = CronHistoryStatus.FAILED;
      }

      const finishedAt = new Date();
      await Promise.all([
        this.cronRepo.update(cron._id, { lastExecution }),
        this.cronHistoryRepo.create({
          cronId: cron._id,
          type: CronHistoryType.MANUAL,
          snapshot: cron.snapshot,
          executedAt: lastExecution,
          finishedAt,
          duration: getTimeString(finishedAt.getTime() - lastExecution.getTime()),
          status: cronStatus,
          res: cronRes ? { data: cronRes } : null,
          error: cronError ? { msg: cronError.message, stack: cronError.stack } : null,
        }),
      ]);
      this.logService.info('End to trigger CronJob %s', cron.title);
    };

    try {
      waiting ? await onTick() : onTick().then();
    } catch (err) {
      throw new BadRequestException(err);
    }

    return { success: true };
  }
}
