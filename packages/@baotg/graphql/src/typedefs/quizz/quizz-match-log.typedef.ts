import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';
import { Quizz } from './quizz.typedef';

@ObjectType()
export class QuizzMatchLog extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  score!: number;

  @Field(() => String, {
    nullable: true,
  })
  status!: string;

  @Field(() => Int, {
    nullable: true,
  })
  finishedPercent!: number;

  @Field(() => String, {
    nullable: true,
  })
  finishedAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobseeker!: string;

  @Field(() => Quizz, {
    nullable: true,
  })
  quiz!: Quizz;

  @Field(() => Int, {
    nullable: true,
  })
  isTimeOut!: number;

  @Field(() => [String], {
    nullable: true,
  })
  questionOrder!: string[];

  @Field(() => String, {
    nullable: true,
  })
  replayMatch!: string;
}

@ObjectType()
export class QuizzMatchLogDetail extends QuizzMatchLog {}

@ObjectType()
export class QuizzMatchLogListReponse extends BaseListResponse({
  viewDto: QuizzMatchLog,
}) {}
