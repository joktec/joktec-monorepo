import { Module } from '@nestjs/common';
import { GameTurnLogService } from './game-turn-log.service';
import { GameTurnLogController } from './game-turn-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameTurnLog } from './entities/game-turn-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameTurnLog]),
  ],
  controllers: [GameTurnLogController],
  providers: [GameTurnLogService],
  exports: [GameTurnLogService],
})
export class GameTurnLogModule { }
