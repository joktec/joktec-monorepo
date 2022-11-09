import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseGameUserSessionInput {
  @Field(() => String, {
    nullable: true,
  })
  userId: string;

  @Field(() => String, {
    nullable: true,
  })
  deviceId: string;

  @Field(() => String, {
    nullable: true,
  })
  sqlId: string;
}

@InputType()
export class CreateGameUserSessionInput extends BaseGameUserSessionInput {}

@InputType()
export class UpdateGameUserSessionInput extends BaseGameUserSessionInput {
  @Field()
  id!: string;
}

@InputType()
export class GameUserSessionPaginationInput extends BasePaginationInput {}

@InputType()
export class GameUserSessionConditionInput extends BaseConditionInput {}

@InputType()
export class GameUserSessionQueryInput extends BaseQueryInput({
  conditionInput: GameUserSessionConditionInput,
  paginationInput: GameUserSessionPaginationInput,
})<GameUserSessionConditionInput, GameUserSessionPaginationInput> {}
