import { IsTimeZone } from '@joktec/core';
import { Prop, Schema } from '@joktec/mongo';
import { DEFAULT_LOCALE, LOCALE } from '../../app.constant';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class AdminConfig {
  @Prop({ required: true, enum: LOCALE, default: DEFAULT_LOCALE })
  language!: LOCALE;

  @Prop({ required: false, default: 'Asia/Seoul' })
  @IsTimeZone()
  timezone?: string;
}
