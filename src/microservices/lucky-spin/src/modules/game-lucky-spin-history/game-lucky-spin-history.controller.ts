import { Controller } from '@nestjs/common';
import { GameLuckySpinHistoryService } from './game-lucky-spin-history.service';
import {
  BaseMicroserviceController,
  GameLuckySpinHistoryMessagePattern,
} from '@jobhopin/core';

@Controller('game-lucky-spin-history')
export class GameLuckySpinHistoryController extends BaseMicroserviceController(
  GameLuckySpinHistoryMessagePattern,
) {
  constructor(
    private readonly gameLuckySpinHistoryService: GameLuckySpinHistoryService,
  ) {
    super(gameLuckySpinHistoryService);
  }
}
