import { IsTimeZone, Type } from '@joktec/core';
import { CrontabStatus, CrontabType, ICrontabModel } from '@joktec/cron';
import { Prop, PropType, Ref, Schema } from '@joktec/mongo';
import { pick } from 'lodash';
import { BaseSchema, I18nText, I18nTransform } from '../common';
import { CronHistory } from './cron-history.schema';

@Schema({
  collection: 'crons',
  textSearch: 'title,description.en,description.vi',
  unique: ['code'],
  paranoid: true,
})
export class CronSchema extends BaseSchema implements ICrontabModel {
  @Prop({ required: true, trim: true, comment: 'Code of the cron job' })
  code!: string;

  @Prop({ default: null, comment: 'Optional title for the cron job' })
  title?: string;

  @Prop({ comment: 'Description of the cron job' })
  @I18nTransform()
  description?: I18nText;

  @Prop({ required: true, trim: true, comment: 'Service name associated with the cron job' })
  serviceName!: string;

  @Prop({ required: true, trim: true, comment: 'Method name associated with the cron job' })
  methodName!: string;

  @Prop({ required: true, enum: CrontabType, default: CrontabType.CRON, comment: 'Type of cron job' })
  type!: CrontabType;

  @Prop({ default: null, comment: 'Cron expression for scheduling' })
  expression?: string;

  @Prop({ default: null, comment: 'Specific date and time for cron execution' })
  cronDate?: Date;

  @Prop({ default: 0, comment: 'Timeout duration in seconds' })
  timeout?: number;

  @Prop({ default: null, example: 'UTC', comment: 'Timezone for cron execution' })
  @IsTimeZone()
  timezone?: string;

  @Prop({ type: Object, default: null, comment: 'Parameters as a JSON object' }, PropType.MAP)
  parameters?: Record<string, any>;

  @Prop({ default: null, comment: 'Last execution date and time of the cron job' })
  lastExecution?: Date;

  @Prop({ default: null, comment: 'Next scheduled execution date and time' })
  nextExecution?: Date;

  @Prop({ required: true, enum: CrontabStatus, default: CrontabStatus.ACTIVATED, comment: 'Status of the cron job' })
  status!: CrontabStatus;

  // Virtual
  @Prop(
    {
      type: CronHistory,
      ref: () => CronHistory,
      foreignField: 'cronRefId',
      localField: '_id',
      options: { sort: { createdAt: -1 } },
    },
    PropType.ARRAY,
  )
  @Type(() => CronHistory)
  histories?: Ref<CronHistory>[];

  @Prop(
    {
      type: CronHistory,
      ref: () => CronHistory,
      foreignField: 'cronRefId',
      localField: '_id',
      options: { sort: { createdAt: -1 } },
      limit: 5,
    },
    PropType.ARRAY,
  )
  @Type(() => CronHistory)
  lastHistories?: Ref<CronHistory>[];

  public snapshot(): Object {
    return pick(this, [
      'code',
      'serviceName',
      'methodName',
      'type',
      'expression',
      'cronDate',
      'timeout',
      'timezone',
      'parameters',
    ]);
  }
}
