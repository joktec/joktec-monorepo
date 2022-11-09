import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class JobCategory extends BaseTypedef {
  @Field(() => Number, { nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  nameEng: string;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  localizedName!: object;

  @Field(() => String, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  updatedAt: Date;

  @Field(() => Number, { nullable: true })
  priority: number;

  @Field(() => String, { nullable: true })
  code: string;

  @Field(() => Number, { nullable: true })
  active: number;
}

@ObjectType()
export class JobCategoryDetail extends JobCategory {}

@ObjectType()
export class JobCategoryListResponse extends BaseListResponse({
  viewDto: JobCategory,
}) {}
