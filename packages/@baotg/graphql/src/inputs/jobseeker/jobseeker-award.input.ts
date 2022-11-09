import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerAwardInput {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  organization!: string;

  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => String, {
    nullable: true,
  })
  createBy!: string;

  @Field(() => Date, {
    nullable: true,
  })
  createDate!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  receiveTime!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updateBy!: string;
}

@InputType()
export class CreateJobSeekerAwardInput extends BaseJobSeekerAwardInput {}

@InputType()
export class UpdateJobSeekerAwardInput extends BaseJobSeekerAwardInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerAwardPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerAwardConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerAwardQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerAwardConditionInput,
  paginationInput: JobSeekerAwardPaginationInput,
})<JobSeekerAwardConditionInput, JobSeekerAwardPaginationInput> {}
