import { PartialType } from '@nestjs/mapped-types';
import { CreateGameLeaderBoardBotDto } from './create-game-leader-board-bot.dto';

export class UpdateGameLeaderBoardBotDto extends PartialType(CreateGameLeaderBoardBotDto) {
  id: number;
}
