import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse } from '../base.typedef';

@ObjectType()
export class JobBudgetLog {
  @Field(() => Number, { nullable: true })
  credits: number;

  @Field(() => String, { nullable: true })
  created: Date;

  @Field(() => String, { nullable: true })
  updated: Date;

  @Field(() => String, { nullable: true })
  createdById: string;

  @Field(() => Number, { nullable: true })
  eventType: number;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  updatedById: string;

  @Field(() => Number, { nullable: true })
  isThumbedUp: number;

  @Field(() => String, { nullable: true })
  candidateId: string;

  @Field(() => Number, { nullable: true })
  remainingCredits: number;

  @Field(() => String, { nullable: true })
  staffUser: string;

  @Field(() => Number, { nullable: true })
  prevBalance: number;

  @Field(() => Number, { nullable: true })
  platform: number;

  @Field(() => String, { nullable: true })
  note: string;

  @Field(() => Number, { nullable: true })
  orgRemainingCredits: number;

  @Field(() => String, { nullable: true })
  organizationId: string;

  @Field(() => Number, { nullable: true })
  orgTotalCredits: number;

  @Field(() => Number, { nullable: true })
  isNegative: number;

  @Field(() => Number, { nullable: true })
  totalInterviewBudget: number;

  @Field(() => Number, { nullable: true })
  type: number;
}

@ObjectType()
export class JobBudgetLogDetail extends JobBudgetLog {}

@ObjectType()
export class JobBudgetLogListResponse extends BaseListResponse({
  viewDto: JobBudgetLog,
}) {}
