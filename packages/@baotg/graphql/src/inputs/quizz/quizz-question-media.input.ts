import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseQuizzQuestionMediaInput {
  @Field(() => String, {
    nullable: false,
  })
  image!: string;

  @Field(() => String, {
    nullable: false,
  })
  video!: string;

  @Field(() => String, {
    nullable: false,
  })
  mediaType!: string;

  @Field(() => String, {
    nullable: false,
  })
  question!: string;
}

@InputType()
export class CreateQuizzQuestionMediaInput extends BaseQuizzQuestionMediaInput {}

@InputType()
export class UpdateQuizzQuestionMediaInput extends BaseQuizzQuestionMediaInput {
  @Field()
  id!: string;
}

@InputType()
export class QuizzQuestionMediaPaginationInput extends BasePaginationInput {}

@InputType()
export class QuizzQuestionMediaConditionInput extends BaseConditionInput {}

@InputType()
export class QuizzQuestionMediaQueryInput extends BaseQueryInput({
  conditionInput: QuizzQuestionMediaConditionInput,
  paginationInput: QuizzQuestionMediaPaginationInput,
})<QuizzQuestionMediaConditionInput, QuizzQuestionMediaPaginationInput> {}
