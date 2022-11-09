import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobInterviewCsInCharge extends BaseTypedef {
  @Field(() => Number, { nullable: true })
  jobinterviewId: number;

  @Field(() => Number, { nullable: true })
  userId: number;
}

@ObjectType()
export class JobInterviewCsInChargeDetail extends JobInterviewCsInCharge {}

@ObjectType()
export class JobInterviewCsInChargeListResponse extends BaseListResponse({
  viewDto: JobInterviewCsInCharge,
}) {}
