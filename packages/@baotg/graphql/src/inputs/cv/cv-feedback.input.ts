import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCvFeedbackInput {
  @Field(() => Date, {
    nullable: true,
  })
  createdDate!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  lastupdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  createdBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  updatedBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  cvFeedbackId!: string;

  @Field(() => String, {
    nullable: true,
  })
  actor!: string;

  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  description!: string;

  @Field(() => String, {
    nullable: true,
  })
  title!: string;
}

@InputType()
export class CreateCvFeedbackInput extends BaseCvFeedbackInput {}

@InputType()
export class UpdateCvFeedbackInput extends BaseCvFeedbackInput {
  @Field()
  id!: string;
}

@InputType()
export class CvFeedbackPaginationInput extends BasePaginationInput {}

@InputType()
export class CvFeedbackConditionInput extends BaseConditionInput {}

@InputType()
export class CvFeedbackQueryInput extends BaseQueryInput({
  conditionInput: CvFeedbackConditionInput,
  paginationInput: CvFeedbackPaginationInput,
})<CvFeedbackConditionInput, CvFeedbackPaginationInput> {}
