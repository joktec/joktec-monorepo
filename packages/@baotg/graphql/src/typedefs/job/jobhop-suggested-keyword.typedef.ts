import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobhopSuggestedKeyword extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  keyword: string;

  @Field(() => Int, {
    nullable: true,
  })
  score: number;

  @Field(() => String, {
    nullable: true,
  })
  created: Date;

  @Field(() => String, {
    nullable: true,
  })
  update: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobId: string;
}

@ObjectType()
export class JobhopSuggestedKeywordDetail extends JobhopSuggestedKeyword {}

@ObjectType()
export class JobhopSuggestedKeywordListResponse extends BaseListResponse({
  viewDto: JobhopSuggestedKeyword,
}) {}
