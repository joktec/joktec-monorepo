import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { GameTurnLogService } from './game-turn-log.service';
import { GameTurnLogController } from './game-turn-log.controller';
import { GameTurnLog, GameTurnLogSchema } from './schemas/game-turn-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GameTurnLog.name,
        schema: GameTurnLogSchema,
      },
    ]),
  ],
  controllers: [GameTurnLogController],
  providers: [GameTurnLogService],
})
export class GameTurnLogModule {}
