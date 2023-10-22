import { ApiPropertyOptional, IsArray, IsHexColor, IsOptional, IsString, Type, ValidateNested } from '@joktec/core';
import { prop, PropType, Schema } from '@joktec/mongo';
import { IsCdnUrl } from 'src/utils';
import { CategoryPlaceholder } from './category-placeholder';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class CategoryWhiteLabel {
  @prop({ default: null })
  @IsOptional()
  @IsHexColor({ message: 'PRIMARY_COLOR_INVALID' })
  @ApiPropertyOptional({ example: '#FFFFFF' })
  primaryColor?: string;

  @prop({ default: null })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  banner?: string;

  @prop({ default: null })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  background?: string;

  @prop({ default: new CategoryPlaceholder() })
  @Type(() => CategoryPlaceholder)
  @IsOptional()
  @ValidateNested()
  @ApiPropertyOptional()
  finderPlaceholder?: CategoryPlaceholder;

  @prop({ default: new CategoryPlaceholder() })
  @Type(() => CategoryPlaceholder)
  @IsOptional()
  @ValidateNested()
  @ApiPropertyOptional()
  ownerPlaceholder?: CategoryPlaceholder;

  @prop({ default: null })
  @IsOptional()
  @IsCdnUrl({ message: 'FINDER_LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png', deprecated: true })
  finderBanner?: string;

  @prop({ default: null })
  @IsOptional()
  @IsCdnUrl({ message: 'OWNER_LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png', deprecated: true })
  ownerBanner?: string;

  @prop({ default: null })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Thông tin thú cưng', deprecated: true })
  formTitle?: string;

  @prop({ default: null })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Bạn thất lạc thú cưng gì?', deprecated: true })
  formLabel?: string;

  @prop({ default: null })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png', deprecated: true })
  formIcon?: string;

  @prop({ type: () => String, default: [] }, PropType.ARRAY)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({ isArray: true, example: ['Đánh rơi', 'Để quên', 'Bị mất cắp', 'Không rõ'], deprecated: true })
  finderReasons?: string[];

  @prop({ type: () => String, default: [] }, PropType.ARRAY)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({ isArray: true, example: ['Đang tạm giữ', 'Giao nộp cho Công an'], deprecated: true })
  ownerReasons?: string[];
}
