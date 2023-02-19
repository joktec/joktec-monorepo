import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSalaryTemplateInput {
  @Field(() => String, { nullable: true })
  avgSalary: string;

  @Field(() => String, { nullable: true })
  experienceYear: string;

  @Field(() => String, { nullable: true })
  industry: string;

  @Field(() => Date, { nullable: true })
  lastUpdate: Date;

  @Field(() => String, { nullable: true })
  maxSalary: string;

  @Field(() => String, { nullable: true })
  minSalary: string;

  @Field(() => String, { nullable: true })
  region: string;

  @Field(() => String, { nullable: true })
  title: string;
}

@InputType()
export class CreateJobSalaryTemplateInput extends BaseJobSalaryTemplateInput {}

@InputType()
export class UpdateJobSalaryTemplateInput extends BaseJobSalaryTemplateInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSalaryTemplatePaginationInput extends BasePaginationInput {}

@InputType()
export class JobSalaryTemplateConditionInput extends BaseConditionInput {}

@InputType()
export class JobSalaryTemplateQueryInput extends BaseQueryInput({
  conditionInput: JobSalaryTemplateConditionInput,
  paginationInput: JobSalaryTemplatePaginationInput,
})<JobSalaryTemplateConditionInput, JobSalaryTemplatePaginationInput> {}
