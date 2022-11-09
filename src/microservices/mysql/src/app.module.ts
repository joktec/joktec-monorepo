import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CacheModule, Module } from '@nestjs/common';
import { HealthModule } from '@jobhopin/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfig } from './config';
import { QuizzModule } from './modules/quizz/quizz.module';
import { QuizzActionLogModule } from './modules/quizz-action-log/quizz-action-log.module';
import { QuizzMatchLogModule } from './modules/quizz-match-log/quizz-match-log.module';
import { QuizzQuestionModule } from './modules/quizz-question/quizz-question.module';
import { QuizzQuestionAnswerModule } from './modules/quizz-question-answer/quizz-question-answer.module';
import { QuizzVoteLogModule } from './modules/quizz-vote-log/quizz-vote-log.module';
import { QuizzCategoryModule } from './modules/quizz-category/quizz-category.module';
import { JobseekerModule } from './modules/jobseeker/jobseeker.module';
import { GameTurnLogModule } from './modules/game-turn-log/game-turn-log.module';
import { QuizzScoreLogModule } from './modules/quizz-score-log/quizz-score-log.module';
import { QuizzLogQuestionAnsweredModule } from './modules/quizz-log-question-answered/quizz-log-question-answered.module';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { GameScoreTurnLogModule } from './modules/game-score-turn-log/game-score-turn-log.module';
import { GameUserSessionModule } from './modules/game-user-session/game-user-session.module';
import { GameLuckySpinModule } from './modules/game-lucky-spin/game-lucky-spin.module';
import { GameLuckySpinItemModule } from './modules/game-lucky-spin-item/game-lucky-spin-item.module';
import { GameLuckySpinMatchModule } from './modules/game-lucky-spin-match/game-lucky-spin-match.module';
import { GameLuckySpinHistoryModule } from './modules/game-lucky-spin-history/game-lucky-spin-history.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(TypeOrmConfig),
    CacheModule.register(),
    ScheduleModule.forRoot(),
    TasksModule,
    HealthModule,
    JobseekerModule,
    GameTurnLogModule,
    QuizzModule,
    QuizzActionLogModule,
    QuizzLogQuestionAnsweredModule,
    QuizzMatchLogModule,
    QuizzQuestionModule,
    QuizzQuestionAnswerModule,
    QuizzVoteLogModule,
    QuizzCategoryModule,
    QuizzScoreLogModule,
    UsersModule,
    GameScoreTurnLogModule,
    GameUserSessionModule,
    GameLuckySpinModule,
    GameLuckySpinItemModule,
    GameLuckySpinMatchModule,
    GameLuckySpinHistoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
