import { ApiProperty, ApiPropertyOptional, IsEnum, IsNotEmpty, IsOptional, IsPositive, Type } from '@joktec/core';
import { index, modelOptions, MongoSchema, prop, Ref } from '@joktec/mongo';
import { IsCdnUrl } from '../../../utils';
import { SettingStatus, SettingType } from './setting.enum';

@index({ title: 'text', subhead: 'text' })
@modelOptions({ schemaOptions: { collection: 'settings' } })
export class Setting extends MongoSchema {
  @prop({ required: true, trim: true, uppercase: true, immutable: true })
  @IsNotEmpty({ message: 'CODE_REQUIRED' })
  @ApiProperty({ type: String, required: true, example: 'LF07PPCCCD' })
  code!: string;

  @prop({ required: true })
  @IsNotEmpty({ message: 'TITLE_REQUIRED' })
  @ApiProperty({ example: 'Passport' })
  title!: string;

  @prop({ default: '' })
  @IsOptional()
  @ApiPropertyOptional({})
  subhead?: string;

  @prop({ default: '' })
  @IsOptional()
  @ApiPropertyOptional({})
  description?: string;

  @prop({ required: true, enum: SettingType, default: SettingType.DEFAULT })
  @IsNotEmpty({ message: 'SETTING_TYPE_REQUIRED' })
  @IsEnum(SettingType, { message: 'SETTING_TYPE_INVALID' })
  @ApiProperty({ enum: SettingType })
  type!: SettingType;

  @prop({ trim: true, default: null })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional()
  link?: string;

  @prop({ default: '' })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional()
  image?: string;

  @prop({ default: '' })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional()
  thumbnail?: string;

  @prop({ default: 0 })
  @IsOptional()
  @IsPositive({ message: 'ORDER_INVALID' })
  @ApiPropertyOptional()
  order?: number;

  @prop({ ref: () => Setting, default: null })
  @Type(() => String)
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  parentId?: Ref<Setting, string>;

  @prop({ required: true, enum: SettingStatus })
  @IsNotEmpty({ message: 'SETTING_STATUS_REQUIRED' })
  @IsEnum(SettingStatus, { message: 'SETTING_STATUS_INVALID' })
  @ApiProperty({ enum: SettingStatus })
  status!: SettingStatus;

  // Virtual
  @prop({ ref: () => Setting, foreignField: '_id', localField: 'parentId', justOne: true })
  @Type(() => Setting)
  @ApiPropertyOptional({ type: Setting })
  parent?: Ref<Setting>;

  @prop({ ref: () => Setting, foreignField: 'parentId', localField: '_id' })
  @Type(() => Setting)
  @ApiPropertyOptional({ type: Setting, isArray: true })
  children?: Ref<Setting>[];
}
