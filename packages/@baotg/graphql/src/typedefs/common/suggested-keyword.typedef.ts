import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class SuggestedKeyword extends BaseTypedef {
  @Field(() => String, { nullable: true })
  keyword: string;

  @Field(() => Number, { nullable: true })
  score: number;

  @Field(() => String, { nullable: true })
  created: Date;

  @Field(() => String, { nullable: true })
  update: Date;

  @Field(() => String, { nullable: true })
  jobId: string;
}

@ObjectType()
export class SuggestedKeywordDetail extends SuggestedKeyword {}

@ObjectType()
export class SuggestedKeywordListResponse extends BaseListResponse({
  viewDto: SuggestedKeyword,
}) {}
