import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class GameScoreTurnLog extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  remainingTurn: number;

  @Field(() => Int, {
    nullable: true,
  })
  totalScore: number;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId: string;

  @Field(() => String, {
    nullable: true,
  })
  userId: string;

  @Field(() => String, {
    nullable: true,
  })
  sqlId: string;
}

@ObjectType()
export class GameScoreTurnLogDetail extends GameScoreTurnLog {}

@ObjectType()
export class GameScoreTurnLogListReponse extends BaseListResponse({
  viewDto: GameScoreTurnLog,
}) {}
