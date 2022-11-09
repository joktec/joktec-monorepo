import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AuthMicroserviceConfig,
  HealthModule,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizzModule } from './modules/quizz/quizz.module';
import { QuizzCategoryModule } from './modules/quizz-category/quizz-category.module';
import { QuizzActionLogModule } from './modules/quizz-action-log/quizz-action-log.module';
import { QuizzEventModule } from './modules/quizz-event/quizz-event.module';
import { QuizzLogQuestionAnswerModule } from './modules/quizz-log-question-answer/quizz-log-question-answer.module';
import { QuizzMatchLogModule } from './modules/quizz-match-log/quizz-match-log.module';
import { QuizzQuestionModule } from './modules/quizz-question/quizz-question.module';
import { QuizzQuestionAnswerModule } from './modules/quizz-question-answer/quizz-question-answer.module';
import { QuizzQuestionMediaModule } from './modules/quizz-question-media/quizz-question-media.module';
import { QuizzScoreLogModule } from './modules/quizz-score-log/quizz-score-log.module';
import { QuizzVoteLogModule } from './modules/quizz-vote-log/quizz-vote-log.module';
import { QuestionModule } from './modules/question/question.module';
import { QuestionCategoryModule } from './modules/question-category/question-category.module';
import { QuizzLanguageModule } from './modules/quizz-language/quizz-language.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ClientsModule } from '@nestjs/microservices';

const authMicroserviceConfig = new AuthMicroserviceConfig();
const jobseekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Module({
  imports: [
    ClientsModule.register([
      {
        name: authMicroserviceConfig.name,
        ...authMicroserviceConfig.microserviceOptions,
      },
      {
        name: jobseekerMicroserviceConfig.name,
        ...jobseekerMicroserviceConfig.microserviceOptions,
      },
    ]),
    CacheModule.register(),
    MongooseModule.forRoot(process.env.QUIZZ_SERVICE_MONGODB_URL),
    ScheduleModule.forRoot(),
    TasksModule,
    HealthModule,
    QuizzModule,
    QuizzCategoryModule,
    QuizzActionLogModule,
    QuizzEventModule,
    QuizzLogQuestionAnswerModule,
    QuizzMatchLogModule,
    QuizzQuestionModule,
    QuizzQuestionAnswerModule,
    QuizzQuestionMediaModule,
    QuizzScoreLogModule,
    QuizzVoteLogModule,
    QuestionModule,
    QuestionCategoryModule,
    QuizzLanguageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
