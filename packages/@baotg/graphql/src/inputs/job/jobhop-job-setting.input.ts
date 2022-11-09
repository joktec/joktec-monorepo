import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopJobSettingInput {
  @Field(() => Number, { nullable: true })
  additionalView: number;
}

@InputType()
export class CreateJobhopJobSettingInput extends BaseJobhopJobSettingInput {}

@InputType()
export class UpdateJobhopJobSettingInput extends BaseJobhopJobSettingInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopJobSettingPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopJobSettingConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopJobSettingQueryInput extends BaseQueryInput({
  conditionInput: JobhopJobSettingConditionInput,
  paginationInput: JobhopJobSettingPaginationInput,
})<JobhopJobSettingConditionInput, JobhopJobSettingPaginationInput> {}
