import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseGameLeaderBoardBotInput {
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

@InputType()
export class CreateGameLeaderBoardBotInput extends BaseGameLeaderBoardBotInput {}

@InputType()
export class UpdateGameLeaderBoardBotInput extends BaseGameLeaderBoardBotInput {
  @Field()
  id!: string;
}

@InputType()
export class GameLeaderBoardBotPaginationInput extends BasePaginationInput {}

@InputType()
export class GameLeaderBoardBotConditionInput extends BaseConditionInput {}

@InputType()
export class GameLeaderBoardBotQueryInput extends BaseQueryInput({
  conditionInput: GameLeaderBoardBotConditionInput,
  paginationInput: GameLeaderBoardBotPaginationInput,
})<GameLeaderBoardBotConditionInput, GameLeaderBoardBotPaginationInput> {}
