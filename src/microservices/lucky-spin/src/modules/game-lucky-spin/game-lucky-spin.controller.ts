import { Controller } from '@nestjs/common';
import { GameLuckySpinService } from './game-lucky-spin.service';
import {
  BaseMicroserviceController,
  GameLuckySpinMessagePattern,
} from '@jobhopin/core';

@Controller('game-lucky-spin')
export class GameLuckySpinController extends BaseMicroserviceController(
  GameLuckySpinMessagePattern,
) {
  constructor(private readonly gameLuckySpinService: GameLuckySpinService) {
    super(gameLuckySpinService);
  }
}
