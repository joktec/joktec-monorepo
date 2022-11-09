import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobScore extends BaseTypedef {
  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => Number, { nullable: true })
  score: number;
}

@ObjectType()
export class JobScoreDetail extends JobScore {}

@ObjectType()
export class JobScoreListResponse extends BaseListResponse({
  viewDto: JobScore,
}) {}
