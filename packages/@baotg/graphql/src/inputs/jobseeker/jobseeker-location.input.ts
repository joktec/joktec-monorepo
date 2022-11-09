import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerLocationInput {
  @Field(() => Date, {
    nullable: true,
  })
  createdOn!: Date;

  @Field(() => String, {
    nullable: true,
  })
  userId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  locationId!: number;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;
}

@InputType()
export class CreateJobSeekerLocationInput extends BaseJobSeekerLocationInput {}

@InputType()
export class UpdateJobSeekerLocationInput extends BaseJobSeekerLocationInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerLocationPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerLocationConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerLocationQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerLocationConditionInput,
  paginationInput: JobSeekerLocationPaginationInput,
})<JobSeekerLocationConditionInput, JobSeekerLocationPaginationInput> {}
