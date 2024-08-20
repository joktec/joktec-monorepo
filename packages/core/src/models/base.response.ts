import { Field } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Constructor, Entity } from './base.dto';

export interface IListResponseDto<T extends Entity> {
  items: T[];
  total: number;

  currentPage?: number;
  prevPage?: number;
  nextPage?: number;
  lastPage?: number;

  prevCursor?: string;
  currentCursor?: string;
  nextCursor?: string;
}

export const BaseListResponse = <T extends Entity>(dto: Constructor<T>) => {
  class BaseListResponse implements IListResponseDto<T> {
    @Field(() => [dto], { defaultValue: [] })
    @ApiProperty({ type: [dto], default: [] })
    @Type(() => dto)
    items: T[];

    @Field({ defaultValue: 0 })
    @ApiProperty({ default: 0 })
    total: number;

    @Field({ nullable: true, defaultValue: null })
    @ApiPropertyOptional()
    currentPage?: number;

    @Field({ nullable: true, defaultValue: null })
    @ApiPropertyOptional()
    prevPage?: number;

    @Field({ nullable: true, defaultValue: null })
    @ApiPropertyOptional()
    nextPage?: number;

    @Field({ nullable: true, defaultValue: null })
    @ApiPropertyOptional()
    lastPage?: number;

    @Field({ nullable: true, defaultValue: null })
    @ApiPropertyOptional()
    prevCursor?: string;

    @Field({ nullable: true, defaultValue: null })
    @ApiPropertyOptional()
    currentCursor?: string;

    @Field({ nullable: true, defaultValue: null })
    @ApiPropertyOptional()
    nextCursor?: string;
  }

  return BaseListResponse;
};
