import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { GameScoreTurnLogService } from './game-score-turn-log.service';
import { GameScoreTurnLogController } from './game-score-turn-log.controller';
import { GameScoreTurnLog } from './entities/game-score-turn-log.entity';
import { GameTurnLogModule } from '../game-turn-log/game-turn-log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameScoreTurnLog]),
    forwardRef(() => GameTurnLogModule),
  ],
  controllers: [GameScoreTurnLogController],
  providers: [GameScoreTurnLogService],
  exports: [GameScoreTurnLogService],
})
export class GameScoreTurnLogModule { }
