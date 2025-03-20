import { Type } from '@joktec/utils';
import { Type as NestType } from '@nestjs/common';
import { Field } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Constructor, Entity } from './base.dto';

export interface IPaginationResponse<T extends Entity> {
  items: T[];
  total: number;

  prevPage?: number;
  currPage?: number;
  nextPage?: number;
  lastPage?: number;

  prevOffset?: number;
  currOffset?: number;
  nextOffset?: number;
  lastOffset?: number;
}

export const PagePaginationResponse = <T extends Entity>(dto: Constructor<T>): NestType<IPaginationResponse<T>> => {
  class BaseListResponseClazz implements IPaginationResponse<T> {
    @Field(() => [dto], { defaultValue: [] })
    @ApiProperty({ type: [dto], default: [], example: () => [new dto()] })
    @Type(() => dto)
    items: T[];

    @Field({ defaultValue: 0 })
    @ApiProperty({ default: 0 })
    total: number;

    @Field({ nullable: true, defaultValue: null })
    @ApiPropertyOptional({ example: 1 })
    prevPage?: number;

    @Field({ nullable: true, defaultValue: 1 })
    @ApiPropertyOptional({ example: 2 })
    currPage?: number;

    @Field({ nullable: true, defaultValue: null })
    @ApiPropertyOptional({ example: 3 })
    nextPage?: number;

    @Field({ nullable: true, defaultValue: null })
    @ApiPropertyOptional({ example: 10 })
    lastPage?: number;
  }

  return BaseListResponseClazz;
};

export const OffsetPaginationResponse = <T extends Entity>(dto: Constructor<T>): NestType<IPaginationResponse<T>> => {
  class BaseListResponseClazz implements IPaginationResponse<T> {
    @Field(() => [dto], { defaultValue: [] })
    @ApiProperty({ type: [dto], default: [], example: () => [new dto()] })
    @Type(() => dto)
    items: T[];

    @Field({ defaultValue: 0 })
    @ApiProperty({ default: 0 })
    total: number;

    @Field({ nullable: true, defaultValue: null })
    @ApiPropertyOptional({ example: 0 })
    prevOffset?: number;

    @Field({ nullable: true, defaultValue: 1 })
    @ApiPropertyOptional({ example: 10 })
    currOffset?: number;

    @Field({ nullable: true, defaultValue: null })
    @ApiPropertyOptional({ example: 20 })
    nextOffset?: number;

    @Field({ nullable: true, defaultValue: null })
    @ApiPropertyOptional({ example: 100 })
    lastOffset?: number;
  }

  return BaseListResponseClazz;
};
