import { Controller } from '@nestjs/common';
import { GameTurnLogService } from './game-turn-log.service';

@Controller()
export class GameTurnLogController {
  constructor(private readonly gameTurnLogService: GameTurnLogService) {}
}
