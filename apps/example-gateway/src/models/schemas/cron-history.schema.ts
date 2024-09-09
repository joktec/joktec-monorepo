import { ObjectId, Prop, PropType, Ref, Schema } from '@joktec/mongo';
import { BaseSchema } from '../common';
import { CronHistoryStatus, CronHistoryType } from '../constants';
import { CronSchema } from './cron.schema';

@Schema({ collection: 'cron_histories', index: ['cronId'], paranoid: true })
export class CronHistory extends BaseSchema {
  @Prop({ type: ObjectId, ref: () => CronSchema, required: true })
  cronId!: Ref<CronSchema, string>;

  @Prop({ required: true, enum: CronHistoryType, default: CronHistoryType.AUTOMATIC })
  type!: CronHistoryType;

  @Prop({ type: Object, default: null }, PropType.MAP)
  snapshot?: Record<string, any>;

  @Prop({ required: true })
  executedAt!: Date;

  @Prop({ default: () => new Date() })
  finishedAt?: Date;

  @Prop({ default: null })
  duration?: string;

  @Prop({ required: true, enum: CronHistoryStatus, default: CronHistoryStatus.COMPLETED })
  status!: CronHistoryStatus;

  @Prop({ type: Object, required: false, default: null }, PropType.MAP)
  res?: Record<string, any>;

  @Prop({ type: Object, required: false, default: null }, PropType.MAP)
  error?: Record<string, any>;

  // Virtual
  @Prop({
    type: CronSchema,
    ref: () => CronSchema,
    foreignField: '_id',
    localField: 'cronId',
    justOne: true,
    example: {},
  })
  cron?: Ref<CronSchema>;
}
