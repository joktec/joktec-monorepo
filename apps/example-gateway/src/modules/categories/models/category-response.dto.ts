import { ApiPropertyOptional } from '@joktec/core';
import { Category } from '../../../models/schemas';

export class CategoryRankingResponse extends Category {
  @ApiPropertyOptional()
  totalDownloads?: number;

  @ApiPropertyOptional()
  latestTime?: Date;
}
