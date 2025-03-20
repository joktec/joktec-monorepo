import { ApiProperty, ApiPropertyOptional } from '@joktec/core';
import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsMongoId, IsNotEmpty, IsOptional, ValidateIf } from '@joktec/utils';
import { ArticleType } from '../../../models/constants';

export class ClearKeywordDto {
  @IsNotEmpty()
  @IsEnum(ArticleType)
  @ApiProperty({ enum: ArticleType })
  type!: ArticleType;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  hideAll?: boolean;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsMongoId({ each: true })
  @ValidateIf(o => !o.hideAll)
  @ApiPropertyOptional({ type: String, isArray: true })
  keywordIds?: string[];
}
