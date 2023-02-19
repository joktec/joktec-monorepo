import { GraphQLJSON } from 'graphql-type-json';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class GameLuckySpin extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  showBannerFrom!: Date;

  @Field(() => String, {
    nullable: true,
  })
  showBannerTo!: Date;

  @Field(() => String, {
    nullable: true,
  })
  startAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  endAt!: Date;

  @Field(() => Number, {
    nullable: true,
  })
  addAdditionalTurn!: number;

  @Field(() => Number, {
    nullable: true,
  })
  isActive!: number;

  @Field(() => Number, {
    nullable: true,
  })
  amountOfPieces!: number;

  @Field(() => Number, {
    nullable: true,
  })
  maximumTurnPerUser!: number;

  @Field(() => String, {
    nullable: true,
  })
  runOfTurnMessage!: string;

  @Field(() => String, {
    nullable: true,
  })
  whitelistToWin!: string;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  luckySpinItems!: object;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  histories!: object;
}

@ObjectType()
export class GameLuckySpinDetail extends GameLuckySpin {}

@ObjectType()
export class GameLuckySpinListReponse extends BaseListResponse({
  viewDto: GameLuckySpin,
}) {}
