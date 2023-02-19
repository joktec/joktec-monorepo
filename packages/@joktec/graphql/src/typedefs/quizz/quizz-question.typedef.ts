import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';
import { QuizzQuestionAnswer } from './quizz-question-answer.typedef';
import { QuizzQuestionMedia } from './quizz-question-media.typedef';

@ObjectType()
export class QuizzQuestion extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
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

  @Field(() => String, {
    nullable: true,
  })
  description!: string;

  @Field(() => [QuizzQuestionAnswer], {
    nullable: true,
  })
  answers!: [QuizzQuestionAnswer];

  @Field(() => [QuizzQuestionMedia], {
    nullable: true,
  })
  medias!: [QuizzQuestionMedia];
}

@ObjectType()
export class QuizzQuestionDetail extends QuizzQuestion {}
@ObjectType()
export class QuizzQuestionListReponse extends BaseListResponse({
  viewDto: QuizzQuestion,
}) {}
