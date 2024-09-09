import { Prop, PropType, Schema } from '@joktec/mongo';
import { BaseSchema, I18nText, I18nTransform } from '../common';
import { SettingStatus, SettingType } from '../constants';

@Schema({ collection: 'settings', unique: ['code'], index: ['parentId'], paranoid: true })
export class Setting extends BaseSchema {
  @Prop({ required: true, trim: true, uppercase: true, immutable: true })
  code!: string;

  @Prop({ required: true })
  @I18nTransform()
  title!: I18nText;

  @Prop({ required: false, default: null })
  @I18nTransform()
  subhead?: I18nText;

  @Prop({ required: false, default: null })
  @I18nTransform()
  description?: I18nText;

  @Prop({ type: Object, default: null }, PropType.MAP)
  value?: Record<string, any>;

  @Prop({ required: true, enum: SettingType, default: SettingType.DEFAULT })
  type!: SettingType;

  @Prop({ required: true, enum: SettingStatus })
  status!: SettingStatus;
}
