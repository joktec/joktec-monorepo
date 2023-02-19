import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopBlackListDomainInput {
  @Field(() => String, { nullable: true })
  domain: string;
}

@InputType()
export class CreateJobhopBlackListDomainInput extends BaseJobhopBlackListDomainInput {}

@InputType()
export class UpdateJobhopBlackListDomainInput extends BaseJobhopBlackListDomainInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopBlackListDomainPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopBlackListDomainConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopBlackListDomainQueryInput extends BaseQueryInput({
  conditionInput: JobhopBlackListDomainConditionInput,
  paginationInput: JobhopBlackListDomainPaginationInput,
})<JobhopBlackListDomainConditionInput, JobhopBlackListDomainPaginationInput> {}
