import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCompanyTypeInput {
  @Field(() => Number, {
    nullable: true,
  })
  id!: number;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEng: string;

  @Field(() => String, {
    nullable: true,
  })
  value: string;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  localizedName!: object;

  @Field(() => Number, {
    nullable: true,
  })
  priority: number;
}

@InputType()
export class CreateCompanyTypeInput extends BaseCompanyTypeInput {}

@InputType()
export class UpdateCompanyTypeInput extends BaseCompanyTypeInput {
  @Field()
  id!: number;
}

@InputType()
export class CompanyTypePaginationInput extends BasePaginationInput {}

@InputType()
export class CompanyTypeConditionInput extends BaseConditionInput {}

@InputType()
export class CompanyTypeQueryInput extends BaseQueryInput({
  conditionInput: CompanyTypeConditionInput,
  paginationInput: CompanyTypePaginationInput,
})<CompanyTypeConditionInput, CompanyTypePaginationInput> {}
