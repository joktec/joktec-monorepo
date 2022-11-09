import {
  GameLuckySpin,
  GameLuckySpinSchema,
} from './schemas/game-lucky-spin.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { GameLuckySpinService } from './game-lucky-spin.service';
import { GameLuckySpinController } from './game-lucky-spin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GameLuckySpin.name,
        schema: GameLuckySpinSchema,
      },
    ]),
  ],
  controllers: [GameLuckySpinController],
  providers: [GameLuckySpinService],
})
export class GameLuckySpinModule {}
