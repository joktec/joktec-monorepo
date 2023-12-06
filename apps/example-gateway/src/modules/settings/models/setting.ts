import { ApiProperty, ApiPropertyOptional, IsEnum, IsNotEmpty, IsOptional, IsPositive, Type } from '@joktec/core';
import { MongoSchema, Prop, Ref, Schema } from '@joktec/mongo';
import { IsCdnUrl } from '../../../utils';
import { SettingStatus, SettingType } from './setting.enum';

@Schema({ collection: 'settings', textSearch: 'title,subhead', paranoid: true })
export class Setting extends MongoSchema {
  @Prop({ required: true, trim: true, uppercase: true, immutable: true })
  @IsNotEmpty({ message: 'CODE_REQUIRED' })
  @ApiProperty({ type: String, required: true, example: 'LF07PPCCCD' })
  code!: string;

  @Prop({ required: true })
  @IsNotEmpty({ message: 'TITLE_REQUIRED' })
  @ApiProperty({ example: 'Passport' })
  title!: string;

  @Prop({ default: '' })
  @IsOptional()
  @ApiPropertyOptional({})
  subhead?: string;

  @Prop({ default: '' })
  @IsOptional()
  @ApiPropertyOptional({})
  description?: string;

  @Prop({ required: true, enum: SettingType, default: SettingType.DEFAULT })
  @IsNotEmpty({ message: 'SETTING_TYPE_REQUIRED' })
  @IsEnum(SettingType, { message: 'SETTING_TYPE_INVALID' })
  @ApiProperty({ enum: SettingType })
  type!: SettingType;

  @Prop({ trim: true, default: null })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional()
  link?: string;

  @Prop({ default: '' })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional()
  image?: string;

  @Prop({ default: '' })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional()
  thumbnail?: string;

  @Prop({ default: 0 })
  @IsOptional()
  @IsPositive({ message: 'ORDER_INVALID' })
  @ApiPropertyOptional()
  order?: number;

  @Prop({ ref: () => Setting, default: null })
  @Type(() => String)
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  parentId?: Ref<Setting, string>;

  @Prop({ required: true, enum: SettingStatus })
  @IsNotEmpty({ message: 'SETTING_STATUS_REQUIRED' })
  @IsEnum(SettingStatus, { message: 'SETTING_STATUS_INVALID' })
  @ApiProperty({ enum: SettingStatus })
  status!: SettingStatus;

  // Virtual
  @Prop({ ref: () => Setting, foreignField: '_id', localField: 'parentId', justOne: true })
  @Type(() => Setting)
  @ApiPropertyOptional({ type: Setting })
  parent?: Ref<Setting>;

  @Prop({ ref: () => Setting, foreignField: 'parentId', localField: '_id' })
  @Type(() => Setting)
  @ApiPropertyOptional({ type: Setting, isArray: true })
  children?: Ref<Setting>[];
}
