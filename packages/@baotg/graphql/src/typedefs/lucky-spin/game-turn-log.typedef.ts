import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class GameTurnLog extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  turn: number;

  @Field(() => Int, {
    nullable: true,
  })
  isRead: number;

  @Field(() => Int, {
    nullable: true,
  })
  isVisible: number;

  @Field(() => Int, {
    nullable: true,
  })
  isClaimed: number;

  @Field(() => String, {
    nullable: true,
  })
  action: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId: string;

  @Field(() => Int, {
    nullable: true,
  })
  quizMatchId: number;

  @Field(() => String, {
    nullable: true,
  })
  metaData: string;

  @Field(() => String, {
    nullable: true,
  })
  sqlId: string;
}

@ObjectType()
export class GameTurnLogDetail extends GameTurnLog {}

@ObjectType()
export class GameTurnLogListReponse extends BaseListResponse({
  viewDto: GameTurnLog,
}) {}
