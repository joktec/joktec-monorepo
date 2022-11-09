import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerRecommendationJobsInput {
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

  @Field(() => Date, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;
}

@InputType()
export class CreateJobSeekerRecommendationJobsInput extends BaseJobSeekerRecommendationJobsInput {}

@InputType()
export class UpdateJobSeekerRecommendationJobsInput extends BaseJobSeekerRecommendationJobsInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerRecommendationJobsPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerRecommendationJobsConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerRecommendationJobsQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerRecommendationJobsConditionInput,
  paginationInput: JobSeekerRecommendationJobsPaginationInput,
})<JobSeekerRecommendationJobsConditionInput, JobSeekerRecommendationJobsPaginationInput> {}
