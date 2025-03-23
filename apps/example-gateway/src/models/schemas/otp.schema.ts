import { ObjectId, Prop, Ref, Schema } from '@joktec/mongo';
import dayjs from 'dayjs';
import { DEFAULT_LOCALE, LOCALE } from '../../app.constant';
import { BaseSchema } from '../common';
import { OTPStatus, OTPType } from '../constants';
import { User } from './user.schema';

@Schema({ collection: 'otp_logs', textSearch: 'email', index: ['authorId', 'email'], paranoid: true })
export class Otp extends BaseSchema {
  @Prop({ required: true, trim: true, isEmail: true })
  email!: string;

  @Prop({ required: true })
  publicCode!: string;

  @Prop({ required: true })
  privateCode!: string;

  @Prop({ default: null })
  activeCode!: string;

  @Prop({ required: true, enum: LOCALE, default: DEFAULT_LOCALE })
  locale!: LOCALE;

  @Prop({ required: true, enum: OTPType })
  type!: OTPType;

  @Prop({ required: true, enum: OTPStatus })
  status!: OTPStatus;

  @Prop({ required: true, default: () => dayjs().startOf('ms').add(30, 's').toDate() })
  expired!: Date;

  @Prop({ required: true, default: 30, min: 0 })
  expiredInSeconds!: number;

  @Prop({ required: true, default: 1, min: 1, max: 5 })
  retry!: number;

  @Prop({ type: ObjectId, ref: () => User })
  authorId?: Ref<User, string>;

  // Virtual
  @Prop({ type: User, ref: () => User, foreignField: '_id', localField: 'authorId', justOne: true, example: {} })
  author?: Ref<User>;
}
