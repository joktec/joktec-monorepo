import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobTemplatesInput {
  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String, { nullable: true })
  requirement: string;

  @Field(() => Number, { nullable: true })
  isActive: number;

  @Field(() => String, { nullable: true })
  createdBy: string;

  @Field(() => String, { nullable: true })
  updatedBy: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  levelId: string;

  @Field(() => Number, { nullable: true })
  industryId: number;

  @Field(() => String, { nullable: true })
  language: string;
}

@InputType()
export class CreateJobTemplatesInput extends BaseJobTemplatesInput {}

@InputType()
export class UpdateJobTemplatesInput extends BaseJobTemplatesInput {
  @Field()
  id!: string;
}

@InputType()
export class JobTemplatesPaginationInput extends BasePaginationInput {}

@InputType()
export class JobTemplatesConditionInput extends BaseConditionInput {}

@InputType()
export class JobTemplatesQueryInput extends BaseQueryInput({
  conditionInput: JobTemplatesConditionInput,
  paginationInput: JobTemplatesPaginationInput,
})<JobTemplatesConditionInput, JobTemplatesPaginationInput> {}
