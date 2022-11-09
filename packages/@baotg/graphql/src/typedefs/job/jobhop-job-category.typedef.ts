import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobhopJobCategory extends BaseTypedef {
  @Field(() => String, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  updatedAt: Date;

  @Field(() => Number, { nullable: true })
  functionId: number;

  @Field(() => String, { nullable: true })
  jobId: string;
}

@ObjectType()
export class JobhopJobCategoryDetail extends JobhopJobCategory {}

@ObjectType()
export class JobhopJobCategoryListResponse extends BaseListResponse({
  viewDto: JobhopJobCategory,
}) {}
