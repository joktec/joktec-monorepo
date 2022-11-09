import {
  MysqlMicroserviceConfig,
  QuizzMicroserviceConfig,
} from '@jobhopin/core';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { QuizzCategoryController } from './controllers/quizz-category.controller';
import { QuizzEventController } from './controllers/quizz-event.controller';
import { QuizzQuestionAnswerController } from './controllers/quizz-question-answer.controller';
import { QuizzQuestionMediaController } from './controllers/quizz-question-media.controller';
import { QuizzQuestionController } from './controllers/quizz-question.controller';
import { QuizzController } from './controllers/quizz.controller';
import { QuizzCategoryDataloader } from './data-loaders/quizz-category.dataloader';
import { QuizzCategoryResolver } from './resolvers/quizz-category.resolver';
import { QuizzMatchLogResolver } from './resolvers/quizz-match-log.resolver';
import { QuizzQuestionAnswerResolver } from './resolvers/quizz-question-answer.resolver';
import { QuizzQuestionResolver } from './resolvers/quizz-question.resolver';
import { QuizzScoreLogResolver } from './resolvers/quizz-score-log.resolver';
import { QuizzResolver } from './resolvers/quizz.resolver';

const quizzMicroserviceConfig = new QuizzMicroserviceConfig();
const mysqlMicroserviceConfig = new MysqlMicroserviceConfig();
@Module({
  imports: [
    ClientsModule.register([
      {
        name: quizzMicroserviceConfig.name,
        ...quizzMicroserviceConfig.microserviceOptions,
      },
      {
        name: mysqlMicroserviceConfig.name,
        ...mysqlMicroserviceConfig.microserviceOptions,
      },
    ]),
  ],
  providers: [
    QuizzResolver,
    QuizzCategoryResolver,
    QuizzQuestionResolver,
    QuizzQuestionAnswerResolver,
    QuizzScoreLogResolver,
    QuizzMatchLogResolver,
    QuizzCategoryDataloader,
  ],
  controllers: [
    QuizzController,
    QuizzEventController,
    QuizzCategoryController,
    QuizzQuestionController,
    QuizzQuestionAnswerController,
    QuizzQuestionMediaController,
  ],
  exports: [QuizzCategoryDataloader],
})
export class GamificationQuizzModule {}
