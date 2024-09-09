import { IsTimeZone } from '@joktec/core';
import { Prop, PropType, Schema } from '@joktec/mongo';
import { pick } from 'lodash';
import { BaseSchema, I18nText, I18nTransform } from '../common';
import { CronStatus, CronType } from '../constants';

@Schema({
  collection: 'crons',
  textSearch: 'title,subhead,description.en,description.ko',
  unique: ['title'],
  paranoid: true,
})
export class CronSchema extends BaseSchema {
  @Prop({ required: true, trim: true })
  title!: string;

  @Prop({ required: false, default: null })
  subhead?: string;

  @Prop({ required: false, default: null })
  @I18nTransform()
  description?: I18nText;

  @Prop({ required: true, trim: true })
  serviceName!: string;

  @Prop({ required: true, trim: true })
  methodName!: string;

  @Prop({ required: true, enum: CronType, default: CronType.CRON })
  type!: CronType;

  @Prop({ required: false, default: null })
  expression?: string;

  @Prop({ default: null })
  cronDate?: Date;

  @Prop({ default: 0 })
  timeout?: number;

  @Prop({ default: null })
  @IsTimeZone()
  timezone?: string;

  @Prop({ type: Object, default: null }, PropType.MAP)
  parameters?: Record<string, any>;

  @Prop({ default: null })
  lastExecution?: Date;

  @Prop({ default: null })
  nextExecution?: Date;

  @Prop({ required: true, enum: CronStatus, default: CronStatus.ACTIVATED })
  status!: CronStatus;

  public get snapshot(): Object {
    return pick(this, [
      'title',
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
