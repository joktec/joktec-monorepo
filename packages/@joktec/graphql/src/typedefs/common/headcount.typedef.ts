import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class Headcount extends BaseTypedef {
  @Field(() => Number, {
    nullable: true,
  })
  id!: number;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEn: string;

  @Field(() => String, {
    nullable: true,
  })
  value: string;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  localizedName!: object;

  @Field(() => Number, {
    nullable: true,
  })
  priority: number;
}

@ObjectType()
export class HeadcountDetail extends Headcount {}

@ObjectType()
export class HeadcountListResponse extends BaseListResponse({
  viewDto: Headcount,
}) {}
