import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse } from '../base.typedef';

@ObjectType()
export class JobBudget {
  @Field(() => Number, { nullable: true })
  totalCredits: number;

  @Field(() => Number, { nullable: true })
  remainingCredits: number;

  @Field(() => Number, { nullable: true })
  viewCount: number;

  @Field(() => Number, { nullable: true })
  candidateCount: number;

  @Field(() => Number, { nullable: true })
  active: number;

  @Field(() => String, { nullable: true })
  expiryDate: Date;

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
export class JobBudgetDetail extends JobBudget {}

@ObjectType()
export class JobBudgetListResponse extends BaseListResponse({
  viewDto: JobBudget,
}) {}
