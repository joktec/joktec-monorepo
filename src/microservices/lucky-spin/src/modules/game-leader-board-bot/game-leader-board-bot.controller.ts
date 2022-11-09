import { Controller } from '@nestjs/common';
import { GameLeaderBoardBotService } from './game-leader-board-bot.service';
import {
  BaseMicroserviceController,
  GameLeaderBoardBotMessagePattern,
} from '@jobhopin/core';

@Controller()
export class GameLeaderBoardBotController extends BaseMicroserviceController(
  GameLeaderBoardBotMessagePattern,
) {
  constructor(
    private readonly gameLeaderBoardBotService: GameLeaderBoardBotService,
  ) {
    super(gameLeaderBoardBotService);
  }
}
