import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerActivityDateInput {
  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => String, {
    nullable: true,
  })
  device!: string;

  @Field(() => String, {
    nullable: true,
  })
  referer!: string;

  @Field(() => String, {
    nullable: true,
  })
  status!: string;

  @Field(() => Date, {
    nullable: true,
  })
  createdDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  messageType!: string;

  @Field(() => String, {
    nullable: true,
  })
  servletPath!: string;

  @Field(() => Int, {
    nullable: true,
  })
  statusCode!: number;
}

@InputType()
export class CreateJobSeekerActivityDateInput extends BaseJobSeekerActivityDateInput {}

@InputType()
export class UpdateJobSeekerActivityDateInput extends BaseJobSeekerActivityDateInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerActivityDatePaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerActivityDateConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerActivityDateQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerActivityDateConditionInput,
  paginationInput: JobSeekerActivityDatePaginationInput,
})<JobSeekerActivityDateConditionInput, JobSeekerActivityDatePaginationInput> {}
