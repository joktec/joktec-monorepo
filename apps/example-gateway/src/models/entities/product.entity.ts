import {
  ApiProperty,
  ApiPropertyOptional,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  Type,
  MaxLength,
} from '@joktec/core';
import { Column, Entity, PrimaryGeneratedColumn } from '@joktec/mysql';
import { BaseEntity } from '../common';

@Entity({ name: 'products' })
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
