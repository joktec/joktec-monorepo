import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCvLinkInput {
  @Field(() => Date, {
    nullable: true,
  })
  createdDate!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  link!: string;

  @Field(() => String, {
    nullable: true,
  })
  cvFile!: string;

  @Field(() => Int, {
    nullable: true,
  })
  fileSize!: number;

  @Field(() => String, {
    nullable: true,
  })
  fileName!: string;

  @Field(() => String, {
    nullable: true,
  })
  contentType!: string;

  @Field(() => String, {
    nullable: true,
  })
  source!: string;
}

@InputType()
export class CreateCvLinkInput extends BaseCvLinkInput {}

@InputType()
export class UpdateCvLinkInput extends BaseCvLinkInput {
  @Field()
  id!: string;
}

@InputType()
export class CvLinkPaginationInput extends BasePaginationInput {}

@InputType()
export class CvLinkConditionInput extends BaseConditionInput {}

@InputType()
export class CvLinkQueryInput extends BaseQueryInput({
  conditionInput: CvLinkConditionInput,
  paginationInput: CvLinkPaginationInput,
})<CvLinkConditionInput, CvLinkPaginationInput> {}
