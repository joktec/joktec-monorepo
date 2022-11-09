import { Controller } from '@nestjs/common';
import { GameUserSessionService } from './game-user-session.service';

@Controller()
export class GameUserSessionController {
  constructor(
    private readonly gameUserSessionService: GameUserSessionService,
  ) {}
}
