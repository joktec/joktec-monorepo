import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CheckInResponse {
  @Field(() => String, {
    nullable: false,
  })
  checkInAt!: string;
}

@ObjectType()
export class PlayQuizzResponse {
  @Field(() => String, {
    nullable: false,
  })
  quizzMatchLog!: string;

  @Field(() => String, {
    nullable: true,
  })
  status!: string;

  @Field(() => Int, {
    nullable: true,
  })
  finishedPercent!: number;

  @Field(() => Int, {
    nullable: true,
  })
  isTimeOut!: number;

  @Field(() => [String], {
    nullable: true,
  })
  questionOrder!: [string];
}

@ObjectType()
export class QuizzMyOverallResponse {
  @Field(() => String, {
    nullable: true,
  })
  quizzMatchLog!: string;

  @Field(() => String, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updatedAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  status!: string;

  @Field(() => String, {
    nullable: true,
  })
  finishedAt!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  finishedPercent!: number;

  @Field(() => Int, {
    nullable: true,
  })
  score!: number;

  @Field(() => [String], {
    nullable: true,
  })
  questionOrder!: [string];

  @Field(() => [QuestionAnsweredLog], {
    nullable: true,
  })
  questionAnsweredLog!: [QuestionAnsweredLog];
}

@ObjectType()
export class QuestionAnsweredLog {
  @Field(() => String, {
    nullable: true,
  })
  question!: string;

  @Field(() => [String], {
    nullable: true,
  })
  answers!: [string];

  @Field(() => [String], {
    nullable: true,
  })
  correctAnswers!: [string];

  @Field(() => Int, {
    nullable: true,
  })
  isCorrect!: number;

  @Field(() => Int, {
    nullable: true,
  })
  usedHint!: number;

  @Field(() => String, {
    nullable: true,
  })
  metaData!: string;
}

@ObjectType()
export class VoteQuizzResponse {
  @Field(() => String, {
    nullable: false,
  })
  voteStatus!: string;

  @Field(() => Int, {
    nullable: false,
  })
  upvotePercent!: number;

  @Field(() => Int, {
    nullable: false,
  })
  numberOfVote!: number;
}

@ObjectType()
export class MyVoteQuizzResponse {
  @Field(() => String, {
    nullable: false,
  })
  voteStatus!: string;

  @Field(() => Int, {
    nullable: false,
  })
  upvotePercent!: number;

  @Field(() => Int, {
    nullable: false,
  })
  numberOfVote!: number;
}