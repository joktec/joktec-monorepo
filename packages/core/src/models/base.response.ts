import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

export interface IListResponseDto<T> {
  items: T[];
  totalItems: number;
  totalPage?: number;
  isLastPage?: boolean;
}

export const BaseListResponse = <T>(dto: new (...args: any) => T): any => {
  class BaseListResponse implements IListResponseDto<T> {
    @Field(() => [dto], { defaultValue: [] })
    @ApiProperty({ type: [dto], required: true, default: [] })
    items: T[];

    @Field(() => Number, { defaultValue: 0 })
    @ApiProperty({ type: Number, required: true, default: 0 })
    totalItems: number;

    @Field(() => Number, { nullable: true, defaultValue: 0 })
    @ApiProperty({ type: Number, required: false, nullable: true, default: 0 })
    totalPage?: number;

    @Field(() => Boolean, { nullable: true, defaultValue: false })
    @ApiProperty({ type: Boolean, required: false, nullable: true, default: false })
    isLastPage?: boolean;
  }

  return BaseListResponse;
};
