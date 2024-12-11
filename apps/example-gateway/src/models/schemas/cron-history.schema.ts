import { CrontabHistoryStatus, CrontabHistoryType, ICrontabHistoryModel } from '@joktec/cron';
import { ObjectId, Prop, PropType, Ref, Schema } from '@joktec/mongo';
import { BaseSchema } from '../common';
import { CronSchema } from './cron.schema';

@Schema({ collection: 'cron_histories', index: ['cronId'], paranoid: true })
export class CronHistory extends BaseSchema implements ICrontabHistoryModel {
  get cronId(): string {
    return this.cronRefId.toString();
  }

  set cronId(value: string) {
    this.cronRefId = new ObjectId(value).toString();
  }

  @Prop({ type: ObjectId, ref: () => CronSchema, required: true, comment: 'Reference ID to the cron job' })
  cronRefId!: Ref<CronSchema, string>;

  @Prop({
    required: true,
    enum: CrontabHistoryType,
    default: CrontabHistoryType.AUTOMATIC,
    comment: 'Type of cron history record',
  })
  type!: CrontabHistoryType;

  @Prop({ type: Object, default: null, comment: 'Snapshot data at the time of execution' }, PropType.MAP)
  snapshot?: Record<string, any>;

  @Prop({ required: true, comment: 'Execution start time' })
  executedAt!: Date;

  @Prop({ default: () => new Date(), comment: 'Execution end time' })
  finishedAt?: Date;

  @Prop({ default: null, comment: 'Duration of execution' })
  duration?: string;

  @Prop({
    required: true,
    enum: CrontabHistoryStatus,
    default: CrontabHistoryStatus.COMPLETED,
    comment: 'Status of the cron execution',
  })
  status!: CrontabHistoryStatus;

  @Prop({ type: Object, default: null, comment: 'Result data of the cron execution' }, PropType.MAP)
  res?: Record<string, any>;

  @Prop({ type: Object, default: null, comment: 'Error details if the cron execution failed' }, PropType.MAP)
  error?: Record<string, any>;

  // Virtual
  @Prop({
    type: CronSchema,
    ref: () => CronSchema,
    foreignField: '_id',
    localField: 'cronRefId',
    justOne: true,
    example: {},
    comment: 'Reference to the related cron job',
  })
  cron?: Ref<CronSchema>;
}
