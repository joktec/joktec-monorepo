import { Controller } from '@nestjs/common';
import { GameLuckySpinHistoryService } from './game-lucky-spin-history.service';

@Controller()
export class GameLuckySpinHistoryController {
  constructor(private readonly GameLuckySpinHistoryService: GameLuckySpinHistoryService) { }
}
