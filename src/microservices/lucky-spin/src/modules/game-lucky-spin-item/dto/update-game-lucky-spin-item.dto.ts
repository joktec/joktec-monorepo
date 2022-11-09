import { PartialType } from '@nestjs/mapped-types';
import { CreateGameLuckySpinItemDto } from './create-game-lucky-spin-item.dto';

export class UpdateGameLuckySpinItemDto extends PartialType(CreateGameLuckySpinItemDto) {
    id: string
}
