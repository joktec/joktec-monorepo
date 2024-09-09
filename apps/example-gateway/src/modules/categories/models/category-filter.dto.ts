import { ApiPropertyOptional, IsEnum, IsOptional } from '@joktec/core';

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
