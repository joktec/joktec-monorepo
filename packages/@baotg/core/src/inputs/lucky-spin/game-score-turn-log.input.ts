import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';
export class BaseGameScoreTurnLogInput implements IBaseInput {
  @IsNotEmpty()
  remainingTurn!: number;

  @IsNotEmpty()
  totalScore!: number;

  @IsNotEmpty()
  jobseekerId!: string;

  userId!: string;
}

export class CreateGameScoreTurnLogInput extends BaseGameScoreTurnLogInput implements IBaseCreateInput {}

export class UpdateGameScoreTurnLogInput extends BaseGameScoreTurnLogInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class GameScoreTurnLogPaginationInput extends BasePaginationInput {}

export class GameScoreTurnLogConditionInput extends BaseConditionInput {}

export class GameScoreTurnLogQueryInput extends BaseQueryInput<
  GameScoreTurnLogConditionInput,
  GameScoreTurnLogPaginationInput
> {}
