import { Prop, Ref, Schema } from '@joktec/mongo';
import { BaseSchema } from '../../base';
import { IsCdnUrl } from '../../utils';
import { SettingStatus, SettingType } from '../constants';

@Schema({ collection: 'settings', textSearch: 'title,subhead', paranoid: true })
export class Setting extends BaseSchema {
  @Prop({ required: true, trim: true, uppercase: true, immutable: true })
  code!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ default: null })
  subhead?: string;

  @Prop({ default: null })
  description?: string;

  @Prop({ required: true, enum: SettingType, default: SettingType.DEFAULT })
  type!: SettingType;

  @Prop({ trim: true, default: null })
  @IsCdnUrl()
  link?: string;

  @Prop({ default: null })
  @IsCdnUrl()
  image?: string;

  @IsCdnUrl()
  thumbnail?: string;

  @Prop({ default: 0, unsigned: true })
  order?: number;

  @Prop({ type: String, ref: () => Setting, default: null })
  parentId?: Ref<Setting, string>;

  @Prop({ required: true, enum: SettingStatus })
  status!: SettingStatus;

  // Virtual
  @Prop({ type: Setting, ref: () => Setting, foreignField: '_id', localField: 'parentId', justOne: true })
  parent?: Ref<Setting>;

  @Prop({ type: [Setting], ref: () => Setting, foreignField: 'parentId', localField: '_id' })
  children?: Ref<Setting>[];
}
