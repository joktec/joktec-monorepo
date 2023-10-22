import { ApiPropertyOptional, IsArray, IsOptional, IsString } from '@joktec/core';
import { prop, PropType, Schema } from '@joktec/mongo';
import { IsCdnUrl } from 'src/utils';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class CategoryPlaceholder {
  @prop({ default: null })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  banner?: string;

  @prop({ default: null })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Thông tin thú cưng' })
  title?: string;

  @prop({ default: null })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Bạn thất lạc thú cưng gì?' })
  formText?: string;

  @prop({ default: null })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  formIcon?: string;

  @prop({ default: null })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Địa điểm nhặt được' })
  locationText?: string;

  @prop({ default: null })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Thời gian nhặt được' })
  actionTimeText?: string;

  @prop({ default: null })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Hướng xử lý' })
  reasonText?: string;

  @prop({ type: () => String, default: [] }, PropType.ARRAY)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({ isArray: true, example: ['Đánh rơi', 'Để quên', 'Bị mất cắp', 'Không rõ'] })
  reasons?: string[];
}
