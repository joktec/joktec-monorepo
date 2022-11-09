import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from '@jobhopin/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameLuckySpinModule } from './modules/game-lucky-spin/game-lucky-spin.module';
import { GameLuckySpinHistoryModule } from './modules/game-lucky-spin-history/game-lucky-spin-history.module';
import { GameLuckySpinItemModule } from './modules/game-lucky-spin-item/game-lucky-spin-item.module';
import { GameLuckySpinMatchModule } from './modules/game-lucky-spin-match/game-lucky-spin-match.module';
import { GameScoreTurnLogModule } from './modules/game-score-turn-log/game-score-turn-log.module';
import { GameTurnLogModule } from './modules/game-turn-log/game-turn-log.module';
import { GameUserSessionModule } from './modules/game-user-session/game-user-session.module';
import { GameAssessmentTestJobHistoryModule } from './modules/game-assessment-test-job-history/game-assessment-test-job-history.module';
import { GameLeaderBoardBotModule } from './modules/game-leader-board-bot/game-leader-board-bot.module';

@Module({
  imports: [
    CacheModule.register(),
    MongooseModule.forRoot(process.env.LUCKY_SPIN_SERVICE_MONGODB_URL),
    HealthModule,
    GameLuckySpinModule,
    GameLuckySpinHistoryModule,
    GameLuckySpinItemModule,
    GameLuckySpinMatchModule,
    GameScoreTurnLogModule,
    GameTurnLogModule,
    GameUserSessionModule,
    GameAssessmentTestJobHistoryModule,
    GameLeaderBoardBotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
