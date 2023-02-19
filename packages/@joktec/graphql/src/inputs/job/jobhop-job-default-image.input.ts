import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopJobDefaultImageInput {
  @Field(() => String, { nullable: true })
  image: string;
}

@InputType()
export class CreateJobhopJobDefaultImageInput extends BaseJobhopJobDefaultImageInput {}

@InputType()
export class UpdateJobhopJobDefaultImageInput extends BaseJobhopJobDefaultImageInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopJobDefaultImagePaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopJobDefaultImageConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopJobDefaultImageQueryInput extends BaseQueryInput({
  conditionInput: JobhopJobDefaultImageConditionInput,
  paginationInput: JobhopJobDefaultImagePaginationInput,
})<JobhopJobDefaultImageConditionInput, JobhopJobDefaultImagePaginationInput> {}
