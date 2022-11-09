import { Controller } from '@nestjs/common';
import { GameScoreTurnLogService } from './game-score-turn-log.service';

@Controller()
export class GameScoreTurnLogController {
  constructor(
    private readonly gameScoreTurnLogService: GameScoreTurnLogService,
  ) {}
}
