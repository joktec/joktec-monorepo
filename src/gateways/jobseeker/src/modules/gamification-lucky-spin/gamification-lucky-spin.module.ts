import { JobseekerMicroserviceConfig, LuckySpinMicroserviceConfig, MysqlMicroserviceConfig, UserMicroserviceConfig } from '@jobhopin/core';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { GamificationLuckySpinController } from './controllers/gamification-lucky-spin.controller';
import { GameLeaderBoardBotResolver } from './resolvers/game-leader-board-bot.resolver';
import { GameLuckySpinResolver } from './resolvers/game-lucky-spin.resolver';
import { GameScoreTurnLogResolver } from './resolvers/game-score-turn-log.resolver';
import { GameTurnLogResolver } from './resolvers/game-turn-log.resolver';
import { GameUserSessionResolver } from './resolvers/game-user-session.resolver';

const luckySpinMicroserviceConfig = new LuckySpinMicroserviceConfig();
const mysqlMicroserviceConfig = new MysqlMicroserviceConfig();
const userMicroserviceConfig = new UserMicroserviceConfig();
const jobseekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Module({
  imports: [
    ClientsModule.register([
      {
        name: luckySpinMicroserviceConfig.name,
        ...luckySpinMicroserviceConfig.microserviceOptions,
      },
      {
        name: mysqlMicroserviceConfig.name,
        ...mysqlMicroserviceConfig.microserviceOptions,
      },
      {
        name: userMicroserviceConfig.name,
        ...userMicroserviceConfig.microserviceOptions,
      },
      {
        name: jobseekerMicroserviceConfig.name,
        ...jobseekerMicroserviceConfig.microserviceOptions,
      },
    ]),
  ],
  providers: [
    GameLeaderBoardBotResolver,
    GameScoreTurnLogResolver,
    GameTurnLogResolver,
    GameUserSessionResolver,
    GameLuckySpinResolver,
  ],
  controllers: [GamificationLuckySpinController],
  exports: [],
})
export class GamificationLuckySpinModule { }
