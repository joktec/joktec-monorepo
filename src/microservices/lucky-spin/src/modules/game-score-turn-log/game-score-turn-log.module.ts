import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { GameScoreTurnLogService } from './game-score-turn-log.service';
import { GameScoreTurnLogController } from './game-score-turn-log.controller';
import {
  GameScoreTurnLog,
  GameScoreTurnLogSchema,
} from './schemas/game-score-turn-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GameScoreTurnLog.name,
        schema: GameScoreTurnLogSchema,
      },
    ]),
  ],
  controllers: [GameScoreTurnLogController],
  providers: [GameScoreTurnLogService],
})
export class GameScoreTurnLogModule {}
