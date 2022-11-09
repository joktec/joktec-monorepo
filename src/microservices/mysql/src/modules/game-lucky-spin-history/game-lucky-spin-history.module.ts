import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { GameLuckySpinHistoryService } from './game-lucky-spin-history.service';
import { GameLuckySpinHistoryController } from './game-lucky-spin-history.controller';
import { GameLuckySpinHistory } from './entities/game-lucky-spin-history.entity';
import { GameLuckySpinItemModule } from '../game-lucky-spin-item/game-lucky-spin-item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameLuckySpinHistory]),
    forwardRef(() => GameLuckySpinItemModule),
  ],
  controllers: [GameLuckySpinHistoryController],
  providers: [GameLuckySpinHistoryService],
  exports: [GameLuckySpinHistoryService],
})
export class GameLuckySpinHistoryModule { }
