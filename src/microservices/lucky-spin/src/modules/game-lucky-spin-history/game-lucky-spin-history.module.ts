import {
  GameLuckySpinHistory,
  GameLuckySpinHistorySchema,
} from './schemas/game-lucky-spin-history.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { GameLuckySpinHistoryService } from './game-lucky-spin-history.service';
import { GameLuckySpinHistoryController } from './game-lucky-spin-history.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GameLuckySpinHistory.name,
        schema: GameLuckySpinHistorySchema,
      },
    ]),
  ],
  controllers: [GameLuckySpinHistoryController],
  providers: [GameLuckySpinHistoryService],
})
export class GameLuckySpinHistoryModule {}
