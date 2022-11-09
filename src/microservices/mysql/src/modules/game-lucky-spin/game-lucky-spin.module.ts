import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { GameLuckySpinService } from './game-lucky-spin.service';
import { GameLuckySpinController } from './game-lucky-spin.controller';
import { GameLuckySpin } from './entities/game-lucky-spin.entity';
import { GameLuckySpinItemModule } from './../game-lucky-spin-item/game-lucky-spin-item.module';
import { GameLuckySpinMatchModule } from '../game-lucky-spin-match/game-lucky-spin-match.module';
import { GameLuckySpinHistoryModule } from '../game-lucky-spin-history/game-lucky-spin-history.module';
import { JobseekerModule } from '../jobseeker/jobseeker.module';
import { GameTurnLogModule } from '../game-turn-log/game-turn-log.module';
import { GameScoreTurnLogModule } from '../game-score-turn-log/game-score-turn-log.module';
import { QuizzModule } from '../quizz/quizz.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameLuckySpin]),
    forwardRef(() => GameLuckySpinItemModule),
    forwardRef(() => GameLuckySpinMatchModule),
    forwardRef(() => GameLuckySpinHistoryModule),
    forwardRef(() => JobseekerModule),
    forwardRef(() => GameTurnLogModule),
    forwardRef(() => GameScoreTurnLogModule),
    forwardRef(() => QuizzModule),
  ],
  controllers: [GameLuckySpinController],
  providers: [GameLuckySpinService],
  exports: [GameLuckySpinService],
})
export class GameLuckySpinModule { }
