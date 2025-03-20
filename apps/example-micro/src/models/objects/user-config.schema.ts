import { Prop, Schema } from '@joktec/mongo';
import { IsTimeZone } from '@joktec/utils';
import { DEFAULT_LOCALE, LOCALE } from '../../app.constant';
import { UserConfigNotify } from './user-config-notify.schema';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class UserConfig {
  @Prop({ required: true, enum: LOCALE, default: DEFAULT_LOCALE })
  language!: LOCALE;

  @Prop({ default: 'Asia/Seoul' })
  @IsTimeZone()
  timezone?: string;

  @Prop({ type: [UserConfigNotify], required: true, default: () => UserConfigNotify.init() })
  notifications!: UserConfigNotify[];

  @Prop({ type: [String], default: ['default', 'event'] })
  topics: string[];
}
