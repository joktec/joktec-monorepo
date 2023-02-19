import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerMatchScoreInput {
  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  matchScore!: number;

  @Field(() => Date, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  updatedAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  createdBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  updatedBy!: string;
}

@InputType()
export class CreateJobSeekerMatchScoreInput extends BaseJobSeekerMatchScoreInput {}

@InputType()
export class UpdateJobSeekerMatchScoreInput extends BaseJobSeekerMatchScoreInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerMatchScorePaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerMatchScoreConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerMatchScoreQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerMatchScoreConditionInput,
  paginationInput: JobSeekerMatchScorePaginationInput,
})<JobSeekerMatchScoreConditionInput, JobSeekerMatchScorePaginationInput> {}
