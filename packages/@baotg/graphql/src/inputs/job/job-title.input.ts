import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobTitleInput {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  nameEn: string;

  @Field(() => Number, { nullable: true })
  priority: number;
}

@InputType()
export class CreateJobTitleInput extends BaseJobTitleInput {}

@InputType()
export class UpdateJobTitleInput extends BaseJobTitleInput {
  @Field()
  id!: string;
}

@InputType()
export class JobTitlePaginationInput extends BasePaginationInput {}

@InputType()
export class JobTitleConditionInput extends BaseConditionInput {}

@InputType()
export class JobTitleQueryInput extends BaseQueryInput({
  conditionInput: JobTitleConditionInput,
  paginationInput: JobTitlePaginationInput,
})<JobTitleConditionInput, JobTitlePaginationInput> {}
