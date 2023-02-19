import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopPaymentLinkInput {
  @Field(() => String, { nullable: true })
  token: string;

  @Field(() => Date, { nullable: true })
  validTo: Date;

  @Field(() => Date, { nullable: true })
  update: Date;

  @Field(() => Date, { nullable: true })
  created: Date;

  @Field(() => Number, { nullable: true })
  used: number;

  @Field(() => String, { nullable: true })
  organizationId: string;

  @Field(() => Number, { nullable: true })
  packageId: number;

  @Field(() => Number, { nullable: true })
  selected: number;

  @Field(() => Number, { nullable: true })
  vat: number;
}

@InputType()
export class CreateJobhopPaymentLinkInput extends BaseJobhopPaymentLinkInput {}

@InputType()
export class UpdateJobhopPaymentLinkInput extends BaseJobhopPaymentLinkInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopPaymentLinkPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopPaymentLinkConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopPaymentLinkQueryInput extends BaseQueryInput({
  conditionInput: JobhopPaymentLinkConditionInput,
  paginationInput: JobhopPaymentLinkPaginationInput,
})<JobhopPaymentLinkConditionInput, JobhopPaymentLinkPaginationInput> {}
