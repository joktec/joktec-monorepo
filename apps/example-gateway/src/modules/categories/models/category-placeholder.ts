import { ApiPropertyOptional, IsArray, IsOptional, IsString } from '@joktec/core';
import { Prop, PropType, Schema } from '@joktec/mongo';
import { IsCdnUrl } from 'src/utils';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class CategoryPlaceholder {
  @Prop({ default: null })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  banner?: string;

  @Prop({ default: null })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Thông tin thú cưng' })
  title?: string;

  @Prop({ default: null })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Bạn thất lạc thú cưng gì?' })
  formText?: string;

  @Prop({ default: null })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  formIcon?: string;

  @Prop({ default: null })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Địa điểm nhặt được' })
  locationText?: string;

  @Prop({ default: null })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Thời gian nhặt được' })
  actionTimeText?: string;

  @Prop({ default: null })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Hướng xử lý' })
  reasonText?: string;

  @Prop({ type: () => String, default: [] }, PropType.ARRAY)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({ isArray: true, example: ['Đánh rơi', 'Để quên', 'Bị mất cắp', 'Không rõ'] })
  reasons?: string[];
}
