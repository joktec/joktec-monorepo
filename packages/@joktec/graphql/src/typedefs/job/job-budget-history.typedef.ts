import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse } from '../base.typedef';

@ObjectType()
export class JobBudgetHistory {
  @Field(() => Number, { nullable: true })
  description: number;

  @Field(() => Number, { nullable: true })
  balance: number;

  @Field(() => Number, { nullable: true })
  prevBalance: number;

  @Field(() => Number, { nullable: true })
  credits: number;

  @Field(() => String, { nullable: true })
  created: Date;

  @Field(() => String, { nullable: true })
  updated: Date;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => Number, { nullable: true })
  platform: number;
}

@ObjectType()
export class JobBudgetHistoryDetail extends JobBudgetHistory {}

@ObjectType()
export class JobBudgetHistoryListResponse extends BaseListResponse({
  viewDto: JobBudgetHistory,
}) {}
