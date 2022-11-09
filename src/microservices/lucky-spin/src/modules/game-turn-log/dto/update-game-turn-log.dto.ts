import { PartialType } from '@nestjs/mapped-types';
import { CreateGameTurnLogDto } from './create-game-turn-log.dto';

export class UpdateGameTurnLogDto extends PartialType(CreateGameTurnLogDto) {
    id: string
}
