import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseGameTurnLogInput implements IBaseInput {
  @IsNotEmpty()
  turn!: number;

  @IsNotEmpty()
  isRead!: number;

  @IsNotEmpty()
  isVisible!: number;

  @IsNotEmpty()
  isClaimed!: number;

  @IsNotEmpty()
  action!: string;

  @IsNotEmpty()
  jobseekerId!: string;

  quizMatchId!: number;

  metaData!: string;
}

export class CreateGameTurnLogInput extends BaseGameTurnLogInput implements IBaseCreateInput {}

export class UpdateGameTurnLogInput extends BaseGameTurnLogInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class GameTurnLogPaginationInput extends BasePaginationInput {}

export class GameTurnLogConditionInput extends BaseConditionInput {}

export class GameTurnLogQueryInput extends BaseQueryInput<GameTurnLogConditionInput, GameTurnLogPaginationInput> {}
