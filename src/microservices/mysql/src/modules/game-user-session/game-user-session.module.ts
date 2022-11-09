import { Module } from '@nestjs/common';
import { GameUserSessionService } from './game-user-session.service';
import { GameUserSessionController } from './game-user-session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameUserSession } from './entities/game-user-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameUserSession])],
  controllers: [GameUserSessionController],
  providers: [GameUserSessionService],
})
export class GameUserSessionModule {}
