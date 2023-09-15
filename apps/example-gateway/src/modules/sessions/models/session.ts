import { IBrowser, ICPU, IDevice, IEngine, IOS, IsEnum, IsNotEmpty } from '@joktec/core';
import { modelOptions, MongoSchema, prop, Ref } from '@joktec/mongo';
import { User } from '../../users';
import { SessionStatus } from './session.enum';
import { PropType, Severity } from '@typegoose/typegoose';

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

  @prop({ type: Object, allowMixed: Severity.ALLOW }, PropType.MAP)
  os?: IOS;

  @prop({ type: Object, allowMixed: Severity.ALLOW }, PropType.MAP)
  browser?: IBrowser;

  @prop({ type: Object, allowMixed: Severity.ALLOW }, PropType.MAP)
  device?: IDevice;

  @prop({ type: Object, allowMixed: Severity.ALLOW }, PropType.MAP)
  cpu?: ICPU;

  @prop({ type: Object, allowMixed: Severity.ALLOW }, PropType.MAP)
  engine?: IEngine;

  @prop({ default: null })
  registrationId?: string;

  @prop({ ref: () => User, default: null })
  userId?: Ref<User, string>;

  @prop({ required: true, enum: SessionStatus })
  @IsNotEmpty({ message: 'SESSION_STATUS_REQUIRED' })
  @IsEnum(SessionStatus, { message: 'SESSION_STATUS_INVALID' })
  status!: SessionStatus;
}
