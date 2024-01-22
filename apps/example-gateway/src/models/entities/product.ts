import { ApiProperty, IsNotEmpty, IsOptional, Max, Min } from '@joktec/core';

export class Product {
  @IsOptional()
  @ApiProperty({ type: String, example: '0000-0000-0000-0000' })
  id?: string;

  @IsNotEmpty()
  @Min(5)
  @Max(255)
  @ApiProperty({ type: String, required: true, example: 'Book' })
  name!: string;

  @IsNotEmpty()
  @Min(5)
  @Max(255)
  @ApiProperty({ type: String, example: 'Lorem Ipsum' })
  description!: string;
}
