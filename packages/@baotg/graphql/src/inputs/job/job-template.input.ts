import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobTemplateInput {
  @Field(() => String, { nullable: true })
  benefitEn: string;

  @Field(() => String, { nullable: true })
  benefitVi: string;

  @Field(() => String, { nullable: true })
  descriptionEn: string;

  @Field(() => String, { nullable: true })
  descriptionVi: string;

  @Field(() => String, { nullable: true })
  industryEn: string;

  @Field(() => String, { nullable: true })
  industryVi: string;

  @Field(() => Date, { nullable: true })
  lastUpdate: Date;

  @Field(() => String, { nullable: true })
  requirementEn: string;

  @Field(() => String, { nullable: true })
  requirementVi: string;

  @Field(() => String, { nullable: true })
  title: string;
}

@InputType()
export class CreateJobTemplateInput extends BaseJobTemplateInput {}

@InputType()
export class UpdateJobTemplateInput extends BaseJobTemplateInput {
  @Field()
  id!: string;
}

@InputType()
export class JobTemplatePaginationInput extends BasePaginationInput {}

@InputType()
export class JobTemplateConditionInput extends BaseConditionInput {}

@InputType()
export class JobTemplateQueryInput extends BaseQueryInput({
  conditionInput: JobTemplateConditionInput,
  paginationInput: JobTemplatePaginationInput,
})<JobTemplateConditionInput, JobTemplatePaginationInput> {}
