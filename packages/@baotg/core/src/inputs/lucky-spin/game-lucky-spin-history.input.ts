import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseGameLuckySpinHistoryInput implements IBaseInput {
  @IsNotEmpty()
  amount!: number;

  @IsNotEmpty()
  itemMetaData!: string;

  @IsNotEmpty()
  luckySpinItemId!: number;

  @IsNotEmpty()
  luckySpinMatchId!: number;
}

export class CreateGameLuckySpinHistoryInput extends BaseGameLuckySpinHistoryInput implements IBaseCreateInput {}

export class UpdateGameLuckySpinHistoryInput extends BaseGameLuckySpinHistoryInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class GameLuckySpinHistoryPaginationInput extends BasePaginationInput {}

export class GameLuckySpinHistoryConditionInput extends BaseConditionInput {}

export class GameLuckySpinHistoryQueryInput extends BaseQueryInput<
  GameLuckySpinHistoryConditionInput,
  GameLuckySpinHistoryPaginationInput
> {}
