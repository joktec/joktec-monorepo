import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';
export class BaseGameLuckySpinInput implements IBaseInput {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  showBannerFrom!: Date;

  @IsNotEmpty()
  showBannerTo!: Date;

  @IsNotEmpty()
  startAt!: Date;

  @IsNotEmpty()
  endAt!: Date;

  @IsNotEmpty()
  addAdditionalTurn!: number;

  isActive!: number;

  @IsNotEmpty()
  amountOfPieces!: number;

  maximumTurnPerUser!: number;

  runOfTurnMessage!: string;

  whitelistToWin!: string;
}

export class CreateGameLuckySpinInput extends BaseGameLuckySpinInput implements IBaseCreateInput {}

export class UpdateGameLuckySpinInput extends BaseGameLuckySpinInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class GameLuckySpinPaginationInput extends BasePaginationInput {}

export class GameLuckySpinConditionInput extends BaseConditionInput {}

export class GameLuckySpinQueryInput extends BaseQueryInput<
  GameLuckySpinConditionInput,
  GameLuckySpinPaginationInput
> {}
