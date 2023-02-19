import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseGameLuckySpinInput {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => Date, {
    nullable: true,
  })
  showBannerFrom!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  showBannerTo!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  startAt!: Date;

  @Field(() => Date, {
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
}

@InputType()
export class CreateGameLuckySpinInput extends BaseGameLuckySpinInput {}

@InputType()
export class UpdateGameLuckySpinInput extends BaseGameLuckySpinInput {
  @Field()
  id!: string;
}

@InputType()
export class GameLuckySpinPaginationInput extends BasePaginationInput {}

@InputType()
export class GameLuckySpinConditionInput extends BaseConditionInput {
  @Field(() => Number, {
    nullable: true,
  })
  isActive!: number;
}

@InputType()
export class GameLuckySpinQueryInput extends BaseQueryInput({
  conditionInput: GameLuckySpinConditionInput,
  paginationInput: GameLuckySpinPaginationInput,
})<GameLuckySpinConditionInput, GameLuckySpinPaginationInput> {}
