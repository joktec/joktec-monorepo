import { BaseDto, BaseListResponseDto } from '../base.dto';

export class GameLuckyItemDto extends BaseDto {
  name!: string;

  itemType!: string;

  quantity!: number;

  amount!: number;

  ratio!: number;

  itemDescription!: string;

  itemData!: string;

  itemImage!: string;

  luckySpinId!: number;

  numberOfPieces!: number;
}

export class GameLuckyItemListReponseDto extends BaseListResponseDto<GameLuckyItemDto> {}
