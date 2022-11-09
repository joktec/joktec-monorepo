import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobInterview extends BaseTypedef {
  @Field(() => String, { nullable: true })
  created: Date;

  @Field(() => String, { nullable: true })
  updated: Date;

  @Field(() => Number, { nullable: true })
  approved: number;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  requestedById: string;

  @Field(() => String, { nullable: true })
  attachedContract: string;

  @Field(() => Number, { nullable: true })
  creditsBalance: number;

  @Field(() => Number, { nullable: true })
  creditsPerInterview: number;

  @Field(() => String, { nullable: true })
  expiryDate: Date;

  @Field(() => Number, { nullable: true })
  salary: number;

  @Field(() => Number, { nullable: true })
  totalChargedCredits: number;

  @Field(() => Number, { nullable: true })
  totalInterviewBudget: number;

  @Field(() => Number, { nullable: true })
  statusId: number;

  @Field(() => Number, { nullable: true })
  active: number;

  @Field(() => Number, { nullable: true })
  creditsPending: number;

  @Field(() => String, { nullable: true })
  consultant: string;
}

@ObjectType()
export class JobInterviewDetail extends JobInterview {}

@ObjectType()
export class JobInterviewListResponse extends BaseListResponse({
  viewDto: JobInterview,
}) {}
