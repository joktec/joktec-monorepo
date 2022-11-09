import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class AnswerQuestionInput {
  @Field(() => String, {
    nullable: false,
  })
  question: string;

  @Field(() => [String], {
    nullable: true,
  })
  answers: string;

  @Field(() => String, {
    nullable: true,
  })
  answerText: string;
}
