import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';
export class BaseGameLuckySpinItemInput implements IBaseInput {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  itemType!: string;

  @IsNotEmpty()
  quantity!: number;

  @IsNotEmpty()
  amount!: number;

  @IsNotEmpty()
  ratio!: number;

  itemDescription!: string;

  itemData!: string;

  itemImage!: string;

  @IsNotEmpty()
  luckySpinId!: number;

  @IsNotEmpty()
  numberOfPieces!: number;
}

export class CreateGameLuckySpinItemInput extends BaseGameLuckySpinItemInput implements IBaseCreateInput {}

export class UpdateGameLuckySpinItemInput extends BaseGameLuckySpinItemInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class GameLuckySpinItemPaginationInput extends BasePaginationInput {}

export class GameLuckySpinItemConditionInput extends BaseConditionInput {}

export class GameLuckySpinItemQueryInput extends BaseQueryInput<
  GameLuckySpinItemConditionInput,
  GameLuckySpinItemPaginationInput
> {}
