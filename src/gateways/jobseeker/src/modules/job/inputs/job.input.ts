import {
  BaseConditionInput,
  BasePaginationInput,
  BaseQueryInput,
} from '@jobhopin/graphql';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BaseJobInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  nameVi!: string;

  @Field(() => String)
  description!: string;

  @Field(() => String)
  descriptionVi!: string;
}

@InputType()
export class CreateJobInput extends BaseJobInput {}

@InputType()
export class UpdateJobInput extends BaseJobInput {
  @Field()
  id!: string;
}

@InputType()
export class JobPaginationInput extends BasePaginationInput {}

@InputType()
export class JobConditionInput extends BaseConditionInput {
  @Field(() => [String], {
    nullable: true,
  })
  category!: string[];
}

@InputType()
export class JobQueryInput extends BaseQueryInput({
  conditionInput: JobConditionInput,
  paginationInput: JobPaginationInput,
})<JobConditionInput, JobPaginationInput> {}
