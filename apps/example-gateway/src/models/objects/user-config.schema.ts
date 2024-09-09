import { IsTimeZone } from '@joktec/core';
import { Prop, Schema } from '@joktec/mongo';
import { DEFAULT_LOCALE, LOCALE } from '../../app.constant';
import { UserConfigNotify } from './user-config-notify.schema';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class UserConfig {
  @Prop({ required: true, enum: LOCALE, default: DEFAULT_LOCALE })
  language!: LOCALE;

  @Prop({ required: false, default: 'Asia/Seoul' })
  @IsTimeZone()
  timezone?: string;

  @Prop({ type: [UserConfigNotify], required: true, default: () => UserConfigNotify.init() })
  notifications!: UserConfigNotify[];

  @Prop({ type: [String], required: false, default: ['default', 'event'] })
  topics: string[];
}
