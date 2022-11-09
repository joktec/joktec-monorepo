import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';
export class BaseGameUserSessionInput implements IBaseInput {
  @IsNotEmpty()
  userId!: string;

  @IsNotEmpty()
  deviceId!: string;
}

export class CreateGameUserSessionInput extends BaseGameUserSessionInput implements IBaseCreateInput {}

export class UpdateGameUserSessionInput extends BaseGameUserSessionInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class GameUserSessionPaginationInput extends BasePaginationInput {}

export class GameUserSessionConditionInput extends BaseConditionInput {}

export class GameUserSessionQueryInput extends BaseQueryInput<
  GameUserSessionConditionInput,
  GameUserSessionPaginationInput
> {}
