import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse } from '../base.typedef';

@ObjectType()
export class JobBudgetRequestAdded {
  @Field(() => String, { nullable: true })
  created: Date;

  @Field(() => String, { nullable: true })
  updated: Date;

  @Field(() => Number, { nullable: true })
  updatedBudget: number;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  paidById: string;

  @Field(() => Number, { nullable: true })
  sentReminder: number;
}

@ObjectType()
export class JobBudgetRequestAddedDetail extends JobBudgetRequestAdded {}

@ObjectType()
export class JobBudgetRequestAddedListResponse extends BaseListResponse({
  viewDto: JobBudgetRequestAdded,
}) {}
