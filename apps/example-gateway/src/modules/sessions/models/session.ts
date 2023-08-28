import { IsEnum, IsNotEmpty } from '@joktec/core';
import { modelOptions, MongoSchema, prop, Ref } from '@joktec/mongo';
import { User } from '../../users';
import { SessionStatus } from './session.enum';

@modelOptions({ schemaOptions: { collection: 'sessions' } })
export class Session extends MongoSchema {
  @prop({ required: true })
  tokenId!: string;

  @prop({ required: true })
  expiresAt!: Date;

  @prop({ required: true, default: new Date() })
  lastActiveAt!: Date;

  @prop({ default: null })
  revokedAt?: Date;

  @prop({})
  userAgent?: string;

  @prop({})
  ipAddress?: string;

  @prop({})
  os?: string;

  @prop({})
  browser?: string;

  @prop({})
  platform?: string;

  @prop({ default: null })
  registrationId?: string;

  @prop({ ref: () => User, default: null })
  userId?: Ref<User, string>;

  @prop({ required: true, enum: SessionStatus })
  @IsNotEmpty({ message: 'SESSION_STATUS_REQUIRED' })
  @IsEnum(SessionStatus, { message: 'SESSION_STATUS_INVALID' })
  status!: SessionStatus;
}
