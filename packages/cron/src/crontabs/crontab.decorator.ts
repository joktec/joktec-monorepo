import { Clazz, InternalServerException } from '@joktec/core';
import dayjs from 'dayjs';
import { has, isString } from 'lodash';
import { CrontabType } from './crontab.constant';
import { ICrontabModel } from './crontab.model';

export type CronTrace = 'all' | 'error' | 'none';

export interface ICrontabMeta {
  cron: Partial<ICrontabModel>;
  service: Clazz;
  verbose?: boolean;
  trace?: CronTrace;
}

export interface ICrontabOption {
  title?: string;
  timezone?: string;
  timeout?: number;
  parameters?: { [key: string]: any };
  verbose?: boolean;
  trace?: CronTrace;
}

global.AllCronMetadata = {};

export function Crontab(expression: string | Date, cronOpts: ICrontabOption = {}): MethodDecorator {
  return function (target: object, propertyKey: string | symbol) {
    const serviceName = target.constructor.name;
    const methodName = propertyKey.toString();
    const code = `${serviceName}.${methodName}`;

    if (has(global.AllCronMetadata, code)) {
      console.error(new InternalServerException(`Duplicate cron name ${code}`));
      process.exit(1);
    }

    const cron: Partial<ICrontabModel> = {
      code,
      serviceName,
      methodName,
      type: CrontabType.CRON,
      title: cronOpts.title,
      timezone: cronOpts.timezone,
      parameters: cronOpts.parameters,
      timeout: cronOpts.timeout,
    };

    // Valid by cronType
    if (isString(expression)) Object.assign(cron, { expression });
    else Object.assign(cron, { cronDate: dayjs(expression).toDate() });

    if (!cron.expression && !cron.cronDate) {
      console.error(new InternalServerException(`Cron ${code} must be set cron expression or specific date`));
      process.exit(1);
    }

    global.AllCronMetadata[code] = {
      cron,
      service: target.constructor,
      verbose: cronOpts.verbose,
      trace: cronOpts.trace,
    } as ICrontabMeta;
  };
}
