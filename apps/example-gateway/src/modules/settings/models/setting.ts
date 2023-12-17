import { MongoSchema, Prop, Ref, Schema } from '@joktec/mongo';
import { IsCdnUrl } from '../../../utils';
import { SettingStatus, SettingType } from './setting.enum';

@Schema({ collection: 'settings', textSearch: 'title,subhead', paranoid: true })
export class Setting extends MongoSchema {
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
  @IsCdnUrl({ message: 'LINK_INVALID' })
  link?: string;

  @Prop({ default: null })
  @IsCdnUrl({ message: 'LINK_INVALID' })
  image?: string;

  @IsCdnUrl({ message: 'LINK_INVALID' })
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
