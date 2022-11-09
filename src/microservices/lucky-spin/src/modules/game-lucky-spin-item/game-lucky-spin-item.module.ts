import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { GameLuckySpinItemService } from './game-lucky-spin-item.service';
import { GameLuckySpinItemController } from './game-lucky-spin-item.controller';
import {
  GameLuckySpinItem,
  GameLuckySpinItemSchema,
} from './schemas/game-lucky-spin-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GameLuckySpinItem.name,
        schema: GameLuckySpinItemSchema,
      },
    ]),
  ],
  controllers: [GameLuckySpinItemController],
  providers: [GameLuckySpinItemService],
})
export class GameLuckySpinItemModule {}
