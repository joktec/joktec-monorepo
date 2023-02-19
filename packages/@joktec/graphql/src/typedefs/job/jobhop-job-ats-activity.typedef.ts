import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobhopJobAtsActivity extends BaseTypedef {
  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => String, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  candidateId: string;

  @Field(() => String, { nullable: true })
  doerId: string;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  organizationId: string;

  @Field(() => String, { nullable: true })
  activityType: string;

  @Field(() => String, { nullable: true })
  candidateType: string;

  @Field(() => String, { nullable: true })
  currentStatus: string;

  @Field(() => String, { nullable: true })
  planName: string;

  @Field(() => String, { nullable: true })
  previousStatus: string;

  @Field(() => Number, { nullable: true })
  isPublic: number;
}

@ObjectType()
export class JobhopJobAtsActivityDetail extends JobhopJobAtsActivity {}

@ObjectType()
export class JobhopJobAtsActivityListResponse extends BaseListResponse({
  viewDto: JobhopJobAtsActivity,
}) {}
