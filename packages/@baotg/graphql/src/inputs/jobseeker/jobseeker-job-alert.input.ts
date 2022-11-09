import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerJobAlertInput {
  @Field(() => String, {
    nullable: true,
  })
  key!: string;

  @Field(() => String, {
    nullable: true,
  })
  frequency!: string;

  @Field(() => String, {
    nullable: true,
  })
  email!: string;

  @Field(() => Int, {
    nullable: true,
  })
  platform!: number;

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
  locationIds!: string;

  @Field(() => String, {
    nullable: true,
  })
  alertVia!: string;

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
  isGuest!: number;
}

@InputType()
export class CreateJobSeekerJobAlertInput extends BaseJobSeekerJobAlertInput {}

@InputType()
export class UpdateJobSeekerJobAlertInput extends BaseJobSeekerJobAlertInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerJobAlertPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerJobAlertConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerJobAlertQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerJobAlertConditionInput,
  paginationInput: JobSeekerJobAlertPaginationInput,
})<JobSeekerJobAlertConditionInput, JobSeekerJobAlertPaginationInput> {}
