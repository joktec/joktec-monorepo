import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerEmailSegmentInput {
  @Field(() => String, {
    nullable: true,
  })
  segmentName!: string;

  @Field(() => String, {
    nullable: true,
  })
  latestTrigger!: string;

  @Field(() => Date, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  routineId!: string;
}

@InputType()
export class CreateJobSeekerEmailSegmentInput extends BaseJobSeekerEmailSegmentInput {}

@InputType()
export class UpdateJobSeekerEmailSegmentInput extends BaseJobSeekerEmailSegmentInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerEmailSegmentPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerEmailSegmentConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerEmailSegmentQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerEmailSegmentConditionInput,
  paginationInput: JobSeekerEmailSegmentPaginationInput,
})<JobSeekerEmailSegmentConditionInput, JobSeekerEmailSegmentPaginationInput> {}
