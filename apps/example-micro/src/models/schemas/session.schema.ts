import { ObjectId, Prop, Ref, Schema } from '@joktec/mongo';
import { DEFAULT_LOCALE, EXAMPLE_MONGO_ID } from '../../app.constant';
import { BaseSchema } from '../common';
import { SessionStatus } from '../constants';
import { SessionDevice } from '../objects';
import { Admin } from './admin.schema';
import { User } from './user.schema';

@Schema({
  collection: 'sessions',
  textSearch: 'ipAddress,userAgent,location',
  unique: ['tokenId'],
  index: ['userRefId'],
  paranoid: true,
})
export class Session extends BaseSchema {
  @Prop({ required: true })
  tokenId!: string;

  @Prop({ required: true })
  expiresAt!: Date;

  @Prop({ required: true, default: () => new Date() })
  lastActiveAt!: Date;

  @Prop({ default: null })
  revokedAt?: Date;

  @Prop({})
  userAgent?: string;

  @Prop({})
  ipAddress?: string;

  @Prop({})
  location?: string;

  @Prop({ default: DEFAULT_LOCALE })
  locale?: string;

  @Prop({ type: SessionDevice, required: false, default: null })
  deviceInfo?: SessionDevice;

  @Prop({ default: null })
  fcmToken?: string;

  @Prop({ type: [String], default: [] })
  topics?: string[];

  @Prop({})
  appVersion?: string;

  @Prop({})
  appBuild?: number;

  @Prop({ required: true, enum: SessionStatus })
  status!: SessionStatus;

  @Prop({ required: true, enum: [Admin.name, User.name], example: Admin.name })
  userType!: string;

  @Prop({ type: ObjectId, refPath: 'userType', example: EXAMPLE_MONGO_ID })
  userRefId?: Ref<Admin | User, string>;

  // Virtual
  @Prop({ type: User, ref: () => User, foreignField: '_id', localField: 'userRefId', justOne: true, example: {} })
  user?: Ref<User>;

  @Prop({ type: Admin, ref: () => Admin, foreignField: '_id', localField: 'userRefId', justOne: true, example: {} })
  admin?: Ref<Admin>;
}
