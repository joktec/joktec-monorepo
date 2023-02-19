import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerRecommendationJobs extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => Int, {
    nullable: true,
  })
  score!: number;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;

  @Field(() => String, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;
}

@ObjectType()
export class JobSeekerRecommendationJobsDetail extends JobSeekerRecommendationJobs {}

@ObjectType()
export class JobSeekerRecommendationJobsListReponse extends BaseListResponse({
  viewDto: JobSeekerRecommendationJobs,
}) {}
