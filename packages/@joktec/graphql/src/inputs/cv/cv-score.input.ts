import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCvScoreInput {
  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  score!: string;

  @Field(() => String, {
    nullable: true,
  })
  cvFile!: string;
}

@InputType()
export class CreateCvScoreInput extends BaseCvScoreInput {}

@InputType()
export class UpdateCvScoreInput extends BaseCvScoreInput {
  @Field()
  id!: string;
}

@InputType()
export class CvScorePaginationInput extends BasePaginationInput {}

@InputType()
export class CvScoreConditionInput extends BaseConditionInput {}

@InputType()
export class CvScoreQueryInput extends BaseQueryInput({
  conditionInput: CvScoreConditionInput,
  paginationInput: CvScorePaginationInput,
})<CvScoreConditionInput, CvScorePaginationInput> {}
