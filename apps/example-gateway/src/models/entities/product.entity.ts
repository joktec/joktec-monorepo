import { ApiProperty, ApiPropertyOptional } from '@joktec/core';
import { Column, PrimaryGeneratedColumn, Tables } from '@joktec/mysql';
import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, Type } from '@joktec/utils';
import { BaseEntity } from '../common';

@Tables<Product>({ name: 'products' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @ApiPropertyOptional()
  id?: string;

  @Column({ length: 255, nullable: false })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  name!: string;

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiPropertyOptional()
  expire?: Date;
}
