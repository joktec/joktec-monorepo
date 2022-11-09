import { Controller } from '@nestjs/common';
import { GameLuckySpinItemService } from './game-lucky-spin-item.service';

@Controller()
export class GameLuckySpinItemController {
  constructor(private readonly GameLuckySpinItemService: GameLuckySpinItemService) { }
}
