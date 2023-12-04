import { ApiProperty, ApiPropertyOptional, IsArray, IsEnum, IsNotEmpty, IsOptional } from '@joktec/core';
import { MongoSchema, prop, PropType, Schema } from '@joktec/mongo';
import { isEmpty } from 'lodash';
import { IsCdnUrl } from '../../../utils';
import { AssetStatus } from './asset.enum';

@Schema<Asset>({ collection: 'assets', textSearch: 'title,subhead', index: 'key', unique: 'etag', paranoid: true })
export class Asset extends MongoSchema {
  @prop({ required: true })
  @IsNotEmpty({ message: 'FILENAME_REQUIRED' })
  @ApiProperty({ example: 'my_filename.png' })
  title!: string;

  @prop({ default: '' })
  @IsOptional()
  @ApiPropertyOptional()
  subhead?: string;

  @prop({ default: '' })
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @prop({ required: true, trim: true, immutable: true })
  @IsNotEmpty({ message: 'FILENAME_REQUIRED' })
  @ApiProperty({ example: 'my_filename.png' })
  originalName!: string;

  @prop({ required: true, trim: true, immutable: true })
  @IsNotEmpty({ message: 'KEY_REQUIRED' })
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiProperty({ example: `https://asset.domain.com/assets/my_filename.png` })
  key!: string;

  @prop({ trim: true, default: null, immutable: (value: string) => !isEmpty(value) })
  @ApiProperty({ example: 'f74b82c901415ff5e8c8ec13e31d2c8a' })
  etag!: string;

  @prop({ trim: true, immutable: true })
  @ApiProperty({ example: 'image/png' })
  mimeType!: string;

  @prop({ type: String, default: [], lowercase: true }, PropType.ARRAY)
  @IsOptional()
  @IsArray({ each: true })
  @ApiProperty({ type: String, isArray: true })
  tags?: string[];

  @prop({ default: 0 })
  @ApiProperty()
  size!: number;

  @prop({ default: null })
  @IsOptional()
  @ApiPropertyOptional()
  width?: number;

  @prop({ default: null })
  @IsOptional()
  @ApiPropertyOptional()
  height?: number;

  @prop({ required: true, enum: AssetStatus })
  @IsNotEmpty({ message: 'ASSET_STATUS_REQUIRED' })
  @IsEnum(AssetStatus, { message: 'ASSET_STATUS_INVALID' })
  @ApiProperty({ enum: AssetStatus })
  status!: AssetStatus;
}
