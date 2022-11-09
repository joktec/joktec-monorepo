import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobThumdownReason extends BaseTypedef {
  @Field(() => String, { nullable: true })
  otherReason: string;

  @Field(() => String, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  jobseekerId: string;

  @Field(() => Number, { nullable: true })
  thumbdownReasonsId: number;
}

@ObjectType()
export class JobThumdownReasonDetail extends JobThumdownReason {}

@ObjectType()
export class JobThumdownReasonListResponse extends BaseListResponse({
  viewDto: JobThumdownReason,
}) {}
