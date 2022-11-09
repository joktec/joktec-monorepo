import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobSearch extends BaseTypedef {
  @Field(() => String, { nullable: true })
  keyword: string;

  @Field(() => String, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  params: string;

  @Field(() => String, { nullable: true })
  path: string;
}

@ObjectType()
export class JobSearchDetail extends JobSearch {}

@ObjectType()
export class JobSearchListResponse extends BaseListResponse({
  viewDto: JobSearch,
}) {}
