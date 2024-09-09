import { Clazz, InternalServerException } from '@joktec/core';
import { has, isString } from 'lodash';
import moment from 'moment';
import Timezone from 'timezone-enum';
import { I18nText } from '../../models/common';
import { CronType } from '../../models/constants';
import { CronSchema } from '../../models/schemas';

export interface ICronMeta {
  cron: CronSchema;
  service: Clazz;
}

export interface ICronOption {
  subhead?: string;
  description?: I18nText;
  timezone?: Timezone;
  timeout?: number;
  parameters?: { [key: string]: any };
}

global.AllCronMetadata = {};

export function Cronner(expression: string | Date, cronOpts: ICronOption = {}): MethodDecorator {
  return function (target: object, propertyKey: string | symbol) {
    const serviceName = target.constructor.name;
    const methodName = propertyKey.toString();
    const title = `${serviceName}.${methodName}`;

    if (has(global.AllCronMetadata, title)) {
      console.error(new InternalServerException(`Duplicate cron name ${title}`));
      process.exit(1);
    }

    const cron = new CronSchema();

    // Required
    cron.title = title;
    cron.serviceName = serviceName;
    cron.methodName = methodName;
    cron.type = CronType.CRON;

    // Optional
    if (cronOpts?.subhead) cron.subhead = cronOpts.subhead;
    if (cronOpts?.description) cron.description = cronOpts.description;
    if (cronOpts?.timezone) cron.timezone = cronOpts.timezone;
    if (cronOpts?.parameters) cron.parameters = cronOpts.parameters;
    if (cronOpts?.timeout) cron.timeout = cronOpts.timeout;

    // Valid by cronType
    if (isString(expression)) Object.assign(cron, { expression, cronDate: null });
    else Object.assign(cron, { expression: null, cronDate: moment(expression).toDate() });

    if (!cron.expression && !cron.cronDate) {
      console.error(new InternalServerException(`Cron ${title} must be set cron expression or specific date`));
      process.exit(1);
    }

    global.AllCronMetadata[title] = { cron, service: target.constructor } as ICronMeta;
  };
}
