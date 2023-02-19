import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse } from '../base.typedef';

@ObjectType()
export class JobBudgetRequest {
  @Field(() => String, { nullable: true })
  created: Date;

  @Field(() => String, { nullable: true })
  updated: Date;

  @Field(() => String, { nullable: true })
  status: string;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  requestById: string;

  @Field(() => Number, { nullable: true })
  sentReminder: number;
}

@ObjectType()
export class JobBudgetRequestDetail extends JobBudgetRequest {}

@ObjectType()
export class JobBudgetRequestListResponse extends BaseListResponse({
  viewDto: JobBudgetRequest,
}) {}
