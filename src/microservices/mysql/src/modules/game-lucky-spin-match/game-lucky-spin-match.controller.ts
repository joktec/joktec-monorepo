import { Controller } from '@nestjs/common';
import { GameLuckySpinMatchService } from './game-lucky-spin-match.service';

@Controller()
export class GameLuckySpinMatchController {
  constructor(private readonly GameLuckySpinMatchService: GameLuckySpinMatchService) { }
}
