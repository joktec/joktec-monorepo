import { Module, forwardRef } from '@nestjs/common';
import { QuizzQuestionService } from './quizz-question.service';
import { QuizzQuestionController } from './quizz-question.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  QuizzQuestion,
  QuizzQuestionSchema,
} from './schemas/quizz-question.schema';
import { AppModule } from '../../app.module';
import { QuizzModule } from '../quizz/quizz.module';
import { QuizzMatchLogModule } from '../quizz-match-log/quizz-match-log.module';
import { QuizzScoreLogModule } from '../quizz-score-log/quizz-score-log.module';
import { QuizzQuestionAnswerModule } from '../quizz-question-answer/quizz-question-answer.module';
import { QuizzLogQuestionAnswerModule } from '../quizz-log-question-answer/quizz-log-question-answer.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuizzQuestion.name, schema: QuizzQuestionSchema },
    ]),
    forwardRef(() => AppModule),
    forwardRef(() => QuizzModule),
    QuizzMatchLogModule,
    QuizzScoreLogModule,
    QuizzQuestionAnswerModule,
    QuizzLogQuestionAnswerModule,
  ],
  controllers: [QuizzQuestionController],
  providers: [QuizzQuestionService],
  exports: [QuizzQuestionService],
})
export class QuizzQuestionModule {}
