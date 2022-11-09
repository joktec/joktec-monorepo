import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { GameLuckySpinMatchService } from './game-lucky-spin-match.service';
import { GameLuckySpinMatchController } from './game-lucky-spin-match.controller';
import { GameLuckySpinMatch } from './entities/game-lucky-spin-match.entity';
import { GameLuckySpinModule } from '../game-lucky-spin/game-lucky-spin.module';
import { GameTurnLogModule } from '../game-turn-log/game-turn-log.module';
import { QuizzModule } from '../quizz/quizz.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameLuckySpinMatch]),
    forwardRef(() => GameLuckySpinModule),
    forwardRef(() => GameTurnLogModule),
    forwardRef(() => QuizzModule),
  ],
  controllers: [GameLuckySpinMatchController],
  providers: [GameLuckySpinMatchService],
  exports: [GameLuckySpinMatchService],
})
export class GameLuckySpinMatchModule { }
