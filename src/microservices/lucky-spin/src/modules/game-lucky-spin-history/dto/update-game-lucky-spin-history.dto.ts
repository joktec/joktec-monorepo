import { PartialType } from '@nestjs/mapped-types';
import { CreateGameLuckySpinHistoryDto } from './create-game-lucky-spin-history.dto';

export class UpdateGameLuckySpinHistoryDto extends PartialType(CreateGameLuckySpinHistoryDto) {
    id: string
}
