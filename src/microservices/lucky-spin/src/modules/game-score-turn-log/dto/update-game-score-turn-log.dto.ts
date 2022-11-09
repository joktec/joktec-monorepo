import { PartialType } from '@nestjs/mapped-types';
import { CreateGameScoreTurnLogDto } from './create-game-score-turn-log.dto';

export class UpdateGameScoreTurnLogDto extends PartialType(CreateGameScoreTurnLogDto) {
    id: string
}
