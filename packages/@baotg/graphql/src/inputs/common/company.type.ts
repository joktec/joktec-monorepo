import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCompanyInput {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  nameEng: string;

  @Field(() => String, { nullable: true })
  organizationId: string;

  @Field(() => String, { nullable: true })
  value: string;
}

@InputType()
export class CreateCompanyInput extends BaseCompanyInput {}

@InputType()
export class UpdateCompanyInput extends BaseCompanyInput {
  @Field()
  id!: string;
}

@InputType()
export class CompanyPaginationInput extends BasePaginationInput {
  @Field(() => Number, { nullable: true })
  sqlId: number;
}

@InputType()
export class CompanyConditionInput extends BaseConditionInput {
  @Field(() => String, { nullable: true })
  status: string;
}

@InputType()
export class CompanyQueryInput extends BaseQueryInput({
  conditionInput: CompanyConditionInput,
  paginationInput: CompanyPaginationInput,
})<CompanyConditionInput, CompanyPaginationInput> {}
