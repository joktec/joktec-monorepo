import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobInterviewCategory extends BaseTypedef {
  @Field(() => String, { nullable: true })
  created: Date;

  @Field(() => String, { nullable: true })
  updated: Date;

  @Field(() => String, { nullable: true })
  name: string;
}

@ObjectType()
export class JobInterviewCategoryDetail extends JobInterviewCategory {}

@ObjectType()
export class JobInterviewCategoryListResponse extends BaseListResponse({
  viewDto: JobInterviewCategory,
}) {}
