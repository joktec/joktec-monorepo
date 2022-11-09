import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AnswerQuestionResponse {
  @Field(() => Int, {
    nullable: true,
  })
  isCorrect!: number;

  @Field(() => String, {
    nullable: true,
  })
  explanation!: string;

  @Field(() => String, {
    nullable: true,
  })
  finishedAt!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  finishedPercent!: number;

  @Field(() => String, {
    nullable: true,
  })
  status!: string;

  @Field(() => Int, {
    nullable: true,
  })
  score!: number;

  @Field(() => Int, {
    nullable: true,
  })
  totalScore!: number;
}
