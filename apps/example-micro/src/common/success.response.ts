import { ApiProperty, ApiPropertyOptional } from '@joktec/core';

export class SuccessResponse {
  @ApiProperty()
  success: boolean;

  @ApiPropertyOptional()
  message?: string;
}
