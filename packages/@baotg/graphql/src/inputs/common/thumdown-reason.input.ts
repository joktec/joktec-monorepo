import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '..';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BaseThumbdownReasonInput {
  @Field(() => String, { nullable: true })
  otherReason: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  jobseekerId: string;

  @Field(() => Number, { nullable: true })
  thumbdownReasonsId: number;
}

@InputType()
export class CreateThumbdownReasonInput extends BaseThumbdownReasonInput {}

@InputType()
export class UpdateThumbdownReasonInput extends BaseThumbdownReasonInput {
  @Field()
  id!: string;
}

@InputType()
export class ThumbdownReasonPaginationInput extends BasePaginationInput {}

@InputType()
export class ThumbdownReasonConditionInput extends BaseConditionInput {}

@InputType()
export class ThumbdownReasonQueryInput extends BaseQueryInput({
  conditionInput: ThumbdownReasonConditionInput,
  paginationInput: ThumbdownReasonPaginationInput,
})<ThumbdownReasonConditionInput, ThumbdownReasonPaginationInput> {}
