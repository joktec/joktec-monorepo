import { ApiProperty, IsNotEmpty, IsOptional, MaxLength, MinLength } from '@joktec/core';

export class Product {
  @IsOptional()
  @ApiProperty({ type: String, example: '0000-0000-0000-0000' })
  id?: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  @ApiProperty({ type: String, required: true, example: 'Book' })
  name!: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  @ApiProperty({ type: String, example: 'Lorem Ipsum' })
  description!: string;
}
