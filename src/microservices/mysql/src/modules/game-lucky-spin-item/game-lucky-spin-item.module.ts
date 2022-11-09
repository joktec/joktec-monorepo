import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { GameLuckySpinItemService } from './game-lucky-spin-item.service';
import { GameLuckySpinItemController } from './game-lucky-spin-item.controller';
import { GameLuckySpinItem } from './entities/game-lucky-spin-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameLuckySpinItem]),
  ],
  controllers: [GameLuckySpinItemController],
  providers: [GameLuckySpinItemService],
  exports: [GameLuckySpinItemService],
})
export class GameLuckySpinItemModule { }
