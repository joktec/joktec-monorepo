import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerCareerInterestCardInput {
  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobTitle!: string;

  @Field(() => String, {
    nullable: true,
  })
  locationId!: string;

  @Field(() => Date, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  updatedAt!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  isDeleted!: number;

  @Field(() => String, {
    nullable: true,
  })
  jobExpectId!: string;
}

@InputType()
export class CreateJobSeekerCareerInterestCardInput extends BaseJobSeekerCareerInterestCardInput {}

@InputType()
export class UpdateJobSeekerCareerInterestCardInput extends BaseJobSeekerCareerInterestCardInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerCareerInterestCardPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerCareerInterestCardConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerCareerInterestCardQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerCareerInterestCardConditionInput,
  paginationInput: JobSeekerCareerInterestCardPaginationInput,
})<JobSeekerCareerInterestCardConditionInput, JobSeekerCareerInterestCardPaginationInput> {}
