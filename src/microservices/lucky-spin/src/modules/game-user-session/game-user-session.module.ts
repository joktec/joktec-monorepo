import {
  GameUserSession,
  GameUserSessionSchema,
} from './schemas/game-user-session.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { GameUserSessionService } from './game-user-session.service';
import { GameUserSessionController } from './game-user-session.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GameUserSession.name,
        schema: GameUserSessionSchema,
      },
    ]),
  ],
  controllers: [GameUserSessionController],
  providers: [GameUserSessionService],
})
export class GameUserSessionModule {}
