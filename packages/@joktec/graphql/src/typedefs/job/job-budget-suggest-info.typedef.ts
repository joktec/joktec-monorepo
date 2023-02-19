import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse } from '../base.typedef';

@ObjectType()
export class JobBudgetSuggestInfo {
  @Field(() => String, { nullable: true })
  info: string;

  @Field(() => String, { nullable: true })
  created: Date;

  @Field(() => String, { nullable: true })
  updated: Date;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => Number, { nullable: true })
  creditBalance: number;
}

@ObjectType()
export class JobBudgetSuggestInfoDetail extends JobBudgetSuggestInfo {}

@ObjectType()
export class JobBudgetSuggestInfoListResponse extends BaseListResponse({
  viewDto: JobBudgetSuggestInfo,
}) {}
