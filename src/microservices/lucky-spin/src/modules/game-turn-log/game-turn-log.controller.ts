import { Controller } from '@nestjs/common';
import { GameTurnLogService } from './game-turn-log.service';
import {
  BaseMicroserviceController,
  GameTurnLogMessagePattern,
} from '@jobhopin/core';

@Controller('game-turn-log')
export class GameTurnLogController extends BaseMicroserviceController(
  GameTurnLogMessagePattern,
) {
  constructor(private readonly gameTurnLogService: GameTurnLogService) {
    super(gameTurnLogService);
  }
}
