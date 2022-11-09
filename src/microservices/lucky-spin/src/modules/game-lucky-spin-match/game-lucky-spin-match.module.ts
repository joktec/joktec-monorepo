import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { GameLuckySpinMatchService } from './game-lucky-spin-match.service';
import { GameLuckySpinMatchController } from './game-lucky-spin-match.controller';
import {
  GameLuckySpinMatch,
  GameLuckySpinMatchSchema,
} from './schemas/game-lucky-spin-match.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GameLuckySpinMatch.name,
        schema: GameLuckySpinMatchSchema,
      },
    ]),
  ],
  controllers: [GameLuckySpinMatchController],
  providers: [GameLuckySpinMatchService],
})
export class GameLuckySpinMatchModule {}
