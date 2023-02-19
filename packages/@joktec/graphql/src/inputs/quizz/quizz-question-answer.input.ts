import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseQuizzQuestionAnswerInput {
  @Field(() => String, {
    nullable: false,
  })
  answer!: string;

  @Field(() => String, {
    nullable: true,
  })
  answerVi!: string;

  @Field(() => Int, {
    nullable: false,
  })
  isCorrectAnswer!: number;

  @Field(() => String, {
    nullable: false,
  })
  question!: string;
}

@InputType()
export class CreateQuizzQuestionAnswerInput extends BaseQuizzQuestionAnswerInput {}

@InputType()
export class UpdateQuizzQuestionAnswerInput extends BaseQuizzQuestionAnswerInput {
  @Field()
  id!: string;
}

@InputType()
export class QuizzQuestionAnswerPaginationInput extends BasePaginationInput {}

@InputType()
export class QuizzQuestionAnswerConditionInput extends BaseConditionInput {
  @Field(() => String, {
    nullable: true,
  })
  question!: string;
}

@InputType()
export class QuizzQuestionAnswerQueryInput extends BaseQueryInput({
  conditionInput: QuizzQuestionAnswerConditionInput,
  paginationInput: QuizzQuestionAnswerPaginationInput,
})<QuizzQuestionAnswerConditionInput, QuizzQuestionAnswerPaginationInput> {}
