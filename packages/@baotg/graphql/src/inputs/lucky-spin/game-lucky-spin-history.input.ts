import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseGameLuckySpinHistoryInput {
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

@InputType()
export class CreateGameLuckySpinHistoryInput extends BaseGameLuckySpinHistoryInput {}

@InputType()
export class UpdateGameLuckySpinHistoryInput extends BaseGameLuckySpinHistoryInput {
  @Field()
  id!: string;
}

@InputType()
export class GameLuckySpinHistoryPaginationInput extends BasePaginationInput {}

@InputType()
export class GameLuckySpinHistoryConditionInput extends BaseConditionInput {}

@InputType()
export class GameLuckySpinHistoryQueryInput extends BaseQueryInput({
  conditionInput: GameLuckySpinHistoryConditionInput,
  paginationInput: GameLuckySpinHistoryPaginationInput,
})<GameLuckySpinHistoryConditionInput, GameLuckySpinHistoryPaginationInput> {}
