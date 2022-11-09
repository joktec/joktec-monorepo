import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class QuizzScoreLog extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  score!: number;

  @Field(() => String, {
    nullable: true,
  })
  scoreType!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseeker!: string;

  @Field(() => String, {
    nullable: true,
  })
  quizMatch!: string;
}

@ObjectType()
export class QuizzScoreLogRanking {
  @Field(() => String, {
    nullable: true,
  })
  jobseeker!: string;

  @Field(() => Int, {
    nullable: true,
  })
  totalScore!: number;

  @Field(() => Int, {
    nullable: true,
  })
  position!: number;
}

@ObjectType()
export class QuizzScoreLogDetail extends QuizzScoreLog {}

@ObjectType()
export class QuizzScoreLogListReponse extends BaseListResponse({
  viewDto: QuizzScoreLog,
}) {}

@ObjectType()
export class QuizzScoreLogListRankingReponse extends BaseListResponse({
  viewDto: QuizzScoreLogRanking,
}) {}
