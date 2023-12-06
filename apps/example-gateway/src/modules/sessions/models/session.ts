import { IBrowser, ICPU, IDevice, IEngine, IOS, IsEnum, IsNotEmpty } from '@joktec/core';
import { MongoSchema, Prop, Ref, Schema } from '@joktec/mongo';
import { PropType, Severity } from '@typegoose/typegoose';
import { User } from '../../users/models';
import { SessionStatus } from './session.enum';

@Schema({ collection: 'sessions', paranoid: true })
export class Session extends MongoSchema {
  @Prop({ required: true })
  tokenId!: string;

  @Prop({ required: true })
  expiresAt!: Date;

  @Prop({ required: true, default: new Date() })
  lastActiveAt!: Date;

  @Prop({ default: null })
  revokedAt?: Date;

  @Prop({})
  userAgent?: string;

  @Prop({})
  ipAddress?: string;

  @Prop({ type: Object, allowMixed: Severity.ALLOW }, PropType.MAP)
  os?: IOS;

  @Prop({ type: Object, allowMixed: Severity.ALLOW }, PropType.MAP)
  browser?: IBrowser;

  @Prop({ type: Object, allowMixed: Severity.ALLOW }, PropType.MAP)
  device?: IDevice;

  @Prop({ type: Object, allowMixed: Severity.ALLOW }, PropType.MAP)
  cpu?: ICPU;

  @Prop({ type: Object, allowMixed: Severity.ALLOW }, PropType.MAP)
  engine?: IEngine;

  @Prop({ default: null })
  registrationId?: string;

  @Prop({ ref: () => User, default: null })
  userId?: Ref<User, string>;

  @Prop({ required: true, enum: SessionStatus })
  @IsNotEmpty({ message: 'SESSION_STATUS_REQUIRED' })
  @IsEnum(SessionStatus, { message: 'SESSION_STATUS_INVALID' })
  status!: SessionStatus;
}
