import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class GameLuckySpinHistory extends BaseTypedef {
  @Field(() => Number, {
    nullable: true,
  })
  amount!: number;

  @Field(() => String, {
    nullable: true,
  })
  itemMetaData!: string;

  @Field(() => Number, {
    nullable: true,
  })
  luckySpinItemId!: number;

  @Field(() => String, {
    nullable: true,
  })
  luckySpinItem!: string;

  @Field(() => Number, {
    nullable: true,
  })
  luckySpinMatchId!: number;

  @Field(() => String, {
    nullable: true,
  })
  luckySpinMatch!: string;
}

@ObjectType()
export class GameLuckySpinHistoryDetail extends GameLuckySpinHistory {}

@ObjectType()
export class GameLuckySpinHistoryListReponse extends BaseListResponse({
  viewDto: GameLuckySpinHistory,
}) {}
