import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class GameLeaderBoardBot extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => String, {
    nullable: true,
  })
  firstName!: string;

  @Field(() => String, {
    nullable: true,
  })
  lastName!: string;

  @Field(() => String, {
    nullable: true,
  })
  avatar!: string;
}

@ObjectType()
export class GameLeaderBoardBotDetail extends GameLeaderBoardBot {}

@ObjectType()
export class GameLeaderBoardBotListReponse extends BaseListResponse({
  viewDto: GameLeaderBoardBot,
}) {}
