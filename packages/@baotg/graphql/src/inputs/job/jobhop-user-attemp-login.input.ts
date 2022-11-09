import { Field, Int, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopUserAttemptLoginInput {
  @Field(() => String, {
    nullable: true,
  })
  created: Date;

  @Field(() => String, {
    nullable: true,
  })
  updated: Date;

  @Field(() => Int, {
    nullable: true,
  })
  platform: number;

  @Field(() => String, {
    nullable: true,
  })
  userId: string;
}

@InputType()
export class CreateJobhopUserAttemptLoginInput extends BaseJobhopUserAttemptLoginInput {}

@InputType()
export class UpdateJobhopUserAttemptLoginInput extends BaseJobhopUserAttemptLoginInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopUserAttemptLoginPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopUserAttemptLoginConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopUserAttemptLoginQueryInput extends BaseQueryInput({
  conditionInput: JobhopUserAttemptLoginConditionInput,
  paginationInput: JobhopUserAttemptLoginPaginationInput,
})<JobhopUserAttemptLoginConditionInput, JobhopUserAttemptLoginPaginationInput> {}
