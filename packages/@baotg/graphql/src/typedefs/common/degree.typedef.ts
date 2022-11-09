import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class Degree extends BaseTypedef {
  @Field(() => Number, {
    nullable: true,
  })
  id!: number;

  @Field(() => String, { nullable: true })
  code: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  value: string;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  localizedName!: object;

  @Field(() => String, { nullable: true })
  nameEng: string;

  @Field(() => Number, { nullable: true })
  priority: number;
}

@ObjectType()
export class DegreeDetail extends Degree {}

@ObjectType()
export class DegreeListResponse extends BaseListResponse({
  viewDto: Degree,
}) {}
