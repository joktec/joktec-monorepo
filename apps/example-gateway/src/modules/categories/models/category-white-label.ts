import { ApiPropertyOptional, IsArray, IsHexColor, IsOptional, IsString, Type, ValidateNested } from '@joktec/core';
import { Prop, PropType, Schema } from '@joktec/mongo';
import { IsCdnUrl } from 'src/utils';
import { CategoryPlaceholder } from './category-placeholder';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class CategoryWhiteLabel {
  @Prop({ default: null })
  @IsOptional()
  @IsHexColor({ message: 'PRIMARY_COLOR_INVALID' })
  @ApiPropertyOptional({ example: '#FFFFFF' })
  primaryColor?: string;

  @Prop({ default: null })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  banner?: string;

  @Prop({ default: null })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  background?: string;

  @Prop({ default: new CategoryPlaceholder() })
  @Type(() => CategoryPlaceholder)
  @IsOptional()
  @ValidateNested()
  @ApiPropertyOptional()
  finderPlaceholder?: CategoryPlaceholder;

  @Prop({ default: new CategoryPlaceholder() })
  @Type(() => CategoryPlaceholder)
  @IsOptional()
  @ValidateNested()
  @ApiPropertyOptional()
  ownerPlaceholder?: CategoryPlaceholder;

  @Prop({ default: null })
  @IsOptional()
  @IsCdnUrl({ message: 'FINDER_LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png', deprecated: true })
  finderBanner?: string;

  @Prop({ default: null })
  @IsOptional()
  @IsCdnUrl({ message: 'OWNER_LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png', deprecated: true })
  ownerBanner?: string;

  @Prop({ default: null })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Thông tin thú cưng', deprecated: true })
  formTitle?: string;

  @Prop({ default: null })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Bạn thất lạc thú cưng gì?', deprecated: true })
  formLabel?: string;

  @Prop({ default: null })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png', deprecated: true })
  formIcon?: string;

  @Prop({ type: () => String, default: [] }, PropType.ARRAY)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({ isArray: true, example: ['Đánh rơi', 'Để quên', 'Bị mất cắp', 'Không rõ'], deprecated: true })
  finderReasons?: string[];

  @Prop({ type: () => String, default: [] }, PropType.ARRAY)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({ isArray: true, example: ['Đang tạm giữ', 'Giao nộp cho Công an'], deprecated: true })
  ownerReasons?: string[];
}
