import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopOrganizationBenefitInput {
  @Field(() => String, { nullable: true })
  created: string;

  @Field(() => String, { nullable: true })
  updated: string;

  @Field(() => String, { nullable: true })
  benefitId: string;

  @Field(() => String, { nullable: true })
  organizationId: string;
}

@InputType()
export class CreateJobhopOrganizationBenefitInput extends BaseJobhopOrganizationBenefitInput {}

@InputType()
export class UpdateJobhopOrganizationBenefitInput extends BaseJobhopOrganizationBenefitInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopOrganizationBenefitPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopOrganizationBenefitConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopOrganizationBenefitQueryInput extends BaseQueryInput({
  conditionInput: JobhopOrganizationBenefitConditionInput,
  paginationInput: JobhopOrganizationBenefitPaginationInput,
})<JobhopOrganizationBenefitConditionInput, JobhopOrganizationBenefitPaginationInput> {}
