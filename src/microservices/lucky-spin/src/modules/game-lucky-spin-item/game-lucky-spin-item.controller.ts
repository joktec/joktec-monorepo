import { Controller } from '@nestjs/common';
import { GameLuckySpinItemService } from './game-lucky-spin-item.service';
import {
  BaseMicroserviceController,
  GameLuckySpinItemMessagePattern,
} from '@jobhopin/core';

@Controller('game-lucky-spin-item')
export class GameLuckySpinItemController extends BaseMicroserviceController(
  GameLuckySpinItemMessagePattern,
) {
  constructor(
    private readonly gameLuckySpinItemService: GameLuckySpinItemService,
  ) {
    super(gameLuckySpinItemService);
  }
}
