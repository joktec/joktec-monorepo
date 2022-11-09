import { Controller } from '@nestjs/common';
import { GameScoreTurnLogService } from './game-score-turn-log.service';
import {
  BaseMicroserviceController,
  GameScoreTurnLogMessagePattern,
} from '@jobhopin/core';

@Controller('game-score-turn-log')
export class GameScoreTurnLogController extends BaseMicroserviceController(
  GameScoreTurnLogMessagePattern,
) {
  constructor(
    private readonly gameScoreTurnLogService: GameScoreTurnLogService,
  ) {
    super(gameScoreTurnLogService);
  }
}
