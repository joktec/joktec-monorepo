import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerCvEmailSegmentInput {
  @Field(() => String, {
    nullable: true,
  })
  email!: string;

  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  fullName!: string;

  @Field(() => Int, {
    nullable: true,
  })
  accountActivated!: number;

  @Field(() => Date, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  updatedAt!: Date;
}

@InputType()
export class CreateJobSeekerCvEmailSegmentInput extends BaseJobSeekerCvEmailSegmentInput {}

@InputType()
export class UpdateJobSeekerCvEmailSegmentInput extends BaseJobSeekerCvEmailSegmentInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerCvEmailSegmentPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerCvEmailSegmentConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerCvEmailSegmentQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerCvEmailSegmentConditionInput,
  paginationInput: JobSeekerCvEmailSegmentPaginationInput,
})<JobSeekerCvEmailSegmentConditionInput, JobSeekerCvEmailSegmentPaginationInput> {}
