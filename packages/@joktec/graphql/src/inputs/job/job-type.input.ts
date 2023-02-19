import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobTypeInput {
  @Field(() => String, {
    nullable: true,
  })
  JobTypeId!: string;

  @Field(() => String, {
    nullable: true,
  })
  code: string;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEng: string;

  @Field(() => Number, {
    nullable: true,
  })
  priority: number;
}

@InputType()
export class CreateJobTypeInput extends BaseJobTypeInput {}

@InputType()
export class UpdateJobTypeInput extends BaseJobTypeInput {
  @Field()
  id!: string;
}

@InputType()
export class JobTypePaginationInput extends BasePaginationInput {}

@InputType()
export class JobTypeConditionInput extends BaseConditionInput {}

@InputType()
export class JobTypeQueryInput extends BaseQueryInput({
  conditionInput: JobTypeConditionInput,
  paginationInput: JobTypePaginationInput,
})<JobTypeConditionInput, JobTypePaginationInput> {}
