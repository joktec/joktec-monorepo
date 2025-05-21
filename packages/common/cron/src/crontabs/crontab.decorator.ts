import { InternalServerException } from '@joktec/core';
import { toBool } from '@joktec/utils';
import dayjs from 'dayjs';
import { has, isString } from 'lodash';
import { CrontabType, ICrontabMeta, ICrontabModel, ICrontabOption } from './models';

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
      trace: cronOpts.trace || 'all',
      verbose: toBool(cronOpts.verbose, false),
      execLog: toBool(cronOpts.execLog, true),
    } as ICrontabMeta;
  };
}
