import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';
export class BaseGameLuckySpinMatchInput implements IBaseInput {
  @IsNotEmpty()
  jobseekerId!: string;

  @IsNotEmpty()
  luckySpinId!: number;
}

export class CreateGameLuckySpinMatchInput extends BaseGameLuckySpinMatchInput implements IBaseCreateInput {}

export class UpdateGameLuckySpinMatchInput extends BaseGameLuckySpinMatchInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class GameLuckySpinMatchPaginationInput extends BasePaginationInput {}

export class GameLuckySpinMatchConditionInput extends BaseConditionInput {}

export class GameLuckySpinMatchQueryInput extends BaseQueryInput<
  GameLuckySpinMatchConditionInput,
  GameLuckySpinMatchPaginationInput
> {}
