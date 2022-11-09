import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseGameScoreTurnLogInput {
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

@InputType()
export class CreateGameScoreTurnLogInput extends BaseGameScoreTurnLogInput {}

@InputType()
export class UpdateGameScoreTurnLogInput extends BaseGameScoreTurnLogInput {
  @Field()
  id!: string;
}

@InputType()
export class GameScoreTurnLogPaginationInput extends BasePaginationInput {}

@InputType()
export class GameScoreTurnLogConditionInput extends BaseConditionInput {}

@InputType()
export class GameScoreTurnLogQueryInput extends BaseQueryInput({
  conditionInput: GameScoreTurnLogConditionInput,
  paginationInput: GameScoreTurnLogPaginationInput,
})<GameScoreTurnLogConditionInput, GameScoreTurnLogPaginationInput> {}
