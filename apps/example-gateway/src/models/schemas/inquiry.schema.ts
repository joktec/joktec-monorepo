import { ObjectId, Prop, Ref, Schema } from '@joktec/mongo';
import { BaseSchema } from '../common';
import { InquiryStatus } from '../constants';
import { Setting } from './setting.schema';
import { User } from './user.schema';

@Schema({ collection: 'inquiries', index: 'authorId', paranoid: true })
export class Inquiry extends BaseSchema {
  @Prop({ type: [ObjectId], ref: () => Setting, required: true, minSize: 1 })
  reasonIds!: Ref<Setting, string>[];

  @Prop({ default: null })
  reasonText?: string;

  @Prop({ default: null })
  feedback?: string;

  @Prop({ default: null })
  respondedAt?: Date;

  @Prop({ required: true, enum: InquiryStatus, default: InquiryStatus.RECEIVED })
  status!: InquiryStatus;

  @Prop({ type: ObjectId, ref: () => User, required: true })
  authorId!: Ref<User, string>;

  // Virtual
  @Prop({ type: User, ref: () => User, foreignField: '_id', localField: 'authorId', justOne: true, example: {} })
  author?: Ref<User>;

  @Prop({ type: [Setting], ref: () => Setting, foreignField: '_id', localField: 'reasonIds', example: [] })
  reason?: Ref<Setting>[];
}
