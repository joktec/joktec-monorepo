import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerJobReferral extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  referralId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;

  @Field(() => String, {
    nullable: true,
  })
  createdAt!: Date;
}

@ObjectType()
export class JobSeekerJobReferralDetail extends JobSeekerJobReferral {}

@ObjectType()
export class JobSeekerJobReferralListReponse extends BaseListResponse({
  viewDto: JobSeekerJobReferral,
}) {}
