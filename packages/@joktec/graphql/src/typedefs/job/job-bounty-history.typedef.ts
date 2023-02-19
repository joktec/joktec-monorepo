import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse } from '../base.typedef';

@ObjectType()
export class JobBountyHistory {
  @Field(() => String, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  action: string;

  @Field(() => String, { nullable: true })
  userEmail: string;

  @Field(() => Number, { nullable: true })
  jobBountyId: number;
}

@ObjectType()
export class JobBountyHistoryDetail extends JobBountyHistory {}

@ObjectType()
export class JobBountyHistoryListResponse extends BaseListResponse({
  viewDto: JobBountyHistory,
}) {}
