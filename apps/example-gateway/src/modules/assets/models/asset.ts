import { ApiProperty, ApiPropertyOptional, IsArray, IsEnum, IsNotEmpty, IsOptional } from '@joktec/core';
import { index, modelOptions, MongoSchema, prop, PropType } from '@joktec/mongo';
import { IsCdnUrl } from '../../../utils';
import { AssetStatus } from './asset.enum';

@index({ title: 'text', subhead: 'text' })
@modelOptions({ schemaOptions: { collection: 'assets' } })
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
  @ApiProperty({ example: `https://s3.domain.com/assets/my_filename.png` })
  key!: string;

  @prop({ trim: true, immutable: true })
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

  @prop({ required: true, enum: AssetStatus })
  @IsNotEmpty({ message: 'ASSET_STATUS_REQUIRED' })
  @IsEnum(AssetStatus, { message: 'ASSET_STATUS_INVALID' })
  @ApiProperty({ enum: AssetStatus })
  status!: AssetStatus;
}
