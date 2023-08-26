import { ApiProperty, IsNotEmpty } from '@joktec/core';

export class OrderRejectDto {
  @IsNotEmpty({ message: 'REASON_REQUIRED' })
  @ApiProperty()
  reason!: string;
}
