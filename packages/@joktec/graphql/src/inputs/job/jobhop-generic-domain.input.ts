import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopGenericDomainInput {
  @Field(() => String, { nullable: true })
  domain: string;
}

@InputType()
export class CreateJobhopGenericDomainInput extends BaseJobhopGenericDomainInput {}

@InputType()
export class UpdateJobhopGenericDomainInput extends BaseJobhopGenericDomainInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopGenericDomainPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopGenericDomainConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopGenericDomainQueryInput extends BaseQueryInput({
  conditionInput: JobhopGenericDomainConditionInput,
  paginationInput: JobhopGenericDomainPaginationInput,
})<JobhopGenericDomainConditionInput, JobhopGenericDomainPaginationInput> {}
