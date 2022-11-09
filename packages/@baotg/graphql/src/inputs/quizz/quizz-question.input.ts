import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseQuizzQuestionInput {
  @Field(() => String, {
    nullable: false,
  })
  question!: string;

  @Field(() => String, {
    nullable: true,
  })
  questionVi!: string;

  @Field(() => String, {
    nullable: true,
  })
  hint!: string;

  @Field(() => String, {
    nullable: true,
  })
  hintVi!: string;

  @Field(() => String, {
    nullable: true,
  })
  explanation!: string;

  @Field(() => String, {
    nullable: true,
  })
  explanationVi!: string;

  @Field(() => Int, {
    nullable: true,
  })
  score!: number;

  @Field(() => Int, {
    nullable: true,
  })
  isMultiAnswer!: number;

  @Field(() => String, {
    nullable: true,
  })
  quiz!: string;

  @Field(() => String, {
    nullable: true,
  })
  isFreetext!: string;

  @Field(() => String, {
    nullable: true,
  })
  isFreetextAnswer!: string;

  @Field(() => String, {
    nullable: true,
  })
  cloneFromId!: string;
}

@InputType()
export class CreateQuizzQuestionInput extends BaseQuizzQuestionInput {}

@InputType()
export class UpdateQuizzQuestionInput extends BaseQuizzQuestionInput {
  @Field()
  id!: string;
}

@InputType()
export class QuizzQuestionPaginationInput extends BasePaginationInput {}

@InputType()
export class QuizzQuestionConditionInput extends BaseConditionInput {
  @Field(() => String, {
    nullable: true,
  })
  quiz!: string;
}

@InputType()
export class QuizzQuestionQueryInput extends BaseQueryInput({
  conditionInput: QuizzQuestionConditionInput,
  paginationInput: QuizzQuestionPaginationInput,
})<QuizzQuestionConditionInput, QuizzQuestionPaginationInput> {}
