import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSearchQuotaInput {
  @Field(() => String, { nullable: true })
  jsId: string;

  @Field(() => Number, { nullable: true })
  isGuest: number;

  @Field(() => Number, { nullable: true })
  credits: number;

  @Field(() => String, { nullable: true })
  fulPath: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}

@InputType()
export class CreateJobSearchQuotaInput extends BaseJobSearchQuotaInput {}

@InputType()
export class UpdateJobSearchQuotaInput extends BaseJobSearchQuotaInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSearchQuotaPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSearchQuotaConditionInput extends BaseConditionInput {}

@InputType()
export class JobSearchQuotaQueryInput extends BaseQueryInput({
  conditionInput: JobSearchQuotaConditionInput,
  paginationInput: JobSearchQuotaPaginationInput,
})<JobSearchQuotaConditionInput, JobSearchQuotaPaginationInput> {}
