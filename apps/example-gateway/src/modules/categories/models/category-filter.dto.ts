import { ApiPropertyOptional } from '@joktec/core';
import { IsEnum, IsOptional } from '@joktec/utils';

export enum CategoryRankingRange {
  MONTHLY = 'monthly',
  OVERALL = 'overall',
}

export class CategoryRankingDto {
  @IsOptional()
  @IsEnum(CategoryRankingRange)
  @ApiPropertyOptional({ enum: CategoryRankingRange })
  type?: CategoryRankingRange;
}
