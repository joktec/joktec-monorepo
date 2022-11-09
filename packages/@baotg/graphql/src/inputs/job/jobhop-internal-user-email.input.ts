import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopInternalUserEmailInput {
  @Field(() => Date, { nullable: true })
  created: Date;

  @Field(() => Date, { nullable: true })
  updated: Date;

  @Field(() => String, { nullable: true })
  emailTiopsTeam: string;

  @Field(() => String, { nullable: true })
  emailHiringTeam: string;

  @Field(() => String, { nullable: true })
  cc: string;

  @Field(() => Number, { nullable: true })
  disabled: number;
}

@InputType()
export class CreateJobhopInternalUserEmailInput extends BaseJobhopInternalUserEmailInput {}

@InputType()
export class UpdateJobhopInternalUserEmailInput extends BaseJobhopInternalUserEmailInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopInternalUserEmailPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopInternalUserEmailConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopInternalUserEmailQueryInput extends BaseQueryInput({
  conditionInput: JobhopInternalUserEmailConditionInput,
  paginationInput: JobhopInternalUserEmailPaginationInput,
})<JobhopInternalUserEmailConditionInput, JobhopInternalUserEmailPaginationInput> {}
