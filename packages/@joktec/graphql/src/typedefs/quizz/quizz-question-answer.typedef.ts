import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class QuizzQuestionAnswer extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  answer!: string;

  @Field(() => String, {
    nullable: true,
  })
  answerVi!: string;

  @Field(() => String, {
    nullable: true,
  })
  question!: string;
}

@ObjectType()
export class QuizzQuestionAnswerDetail extends QuizzQuestionAnswer {}

@ObjectType()
export class QuizzQuestionAnswerListReponse extends BaseListResponse({
  viewDto: QuizzQuestionAnswer,
}) {}
