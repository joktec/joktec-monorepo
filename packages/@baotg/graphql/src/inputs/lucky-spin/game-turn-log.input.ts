import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseGameTurnLogInput {
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

@InputType()
export class CreateGameTurnLogInput extends BaseGameTurnLogInput {}

@InputType()
export class UpdateGameTurnLogInput extends BaseGameTurnLogInput {
  @Field()
  id!: string;
}

@InputType()
export class GameTurnLogPaginationInput extends BasePaginationInput {}

@InputType()
export class GameTurnLogConditionInput extends BaseConditionInput {}

@InputType()
export class GameTurnLogQueryInput extends BaseQueryInput({
  conditionInput: GameTurnLogConditionInput,
  paginationInput: GameTurnLogPaginationInput,
})<GameTurnLogConditionInput, GameTurnLogPaginationInput> {}
