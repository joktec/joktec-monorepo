import { Controller } from '@nestjs/common';
import { GameUserSessionService } from './game-user-session.service';
import {
  BaseMicroserviceController,
  GameUserSessionMessagePattern,
} from '@jobhopin/core';

@Controller('game-user-session')
export class GameUserSessionController extends BaseMicroserviceController(
  GameUserSessionMessagePattern,
) {
  constructor(private readonly gameUserSessionService: GameUserSessionService) {
    super(gameUserSessionService);
  }
}
