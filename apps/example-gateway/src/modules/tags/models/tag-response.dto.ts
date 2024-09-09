import { ApiProperty } from '@joktec/core';
import { UserKeyword } from '../../../models/objects';

export class LatestKeywordResponseDto {
  @ApiProperty({ type: UserKeyword, isArray: true })
  feed!: UserKeyword[];

  @ApiProperty({ type: UserKeyword, isArray: true })
  card!: UserKeyword[];
}
