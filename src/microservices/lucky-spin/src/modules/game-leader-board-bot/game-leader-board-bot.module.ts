import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { GameLeaderBoardBotService } from './game-leader-board-bot.service';
import { GameLeaderBoardBotController } from './game-leader-board-bot.controller';
import {
  GameLeaderBoardBot,
  GameLeaderBoardBotSchema,
} from './schemas/game-leader-board-bot.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GameLeaderBoardBot.name,
        schema: GameLeaderBoardBotSchema,
      },
    ]),
  ],
  controllers: [GameLeaderBoardBotController],
  providers: [GameLeaderBoardBotService],
})
export class GameLeaderBoardBotModule {}
