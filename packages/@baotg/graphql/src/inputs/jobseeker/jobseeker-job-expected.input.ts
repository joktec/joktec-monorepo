import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerJobExpectedInput {
  @Field(() => String, {
    nullable: true,
  })
  title!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;

  @Field(() => Date, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  aiStatusCode!: number;

  @Field(() => String, {
    nullable: true,
  })
  aiUpdatedAt!: string;

  @Field(() => String, {
    nullable: true,
  })
  skillsVectorEmbedding!: string;

  @Field(() => String, {
    nullable: true,
  })
  vectorEmbedding!: string;

  @Field(() => Date, {
    nullable: true,
  })
  updatedAt!: Date;
}

@InputType()
export class CreateJobSeekerJobExpectedInput extends BaseJobSeekerJobExpectedInput {}

@InputType()
export class UpdateJobSeekerJobExpectedInput extends BaseJobSeekerJobExpectedInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerJobExpectedPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerJobExpectedConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerJobExpectedQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerJobExpectedConditionInput,
  paginationInput: JobSeekerJobExpectedPaginationInput,
})<JobSeekerJobExpectedConditionInput, JobSeekerJobExpectedPaginationInput> {}
