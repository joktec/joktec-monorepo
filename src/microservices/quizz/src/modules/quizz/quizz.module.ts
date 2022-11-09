import { Module, forwardRef } from '@nestjs/common';
import { AppModule } from '../../app.module';
import { QuizzService } from './quizz.service';
import { QuizzController } from './quizz.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quizz, QuizzSchema } from './schemas/quizz.schema';
import { QuizzMatchLogModule } from '../quizz-match-log/quizz-match-log.module';
import { QuizzQuestionModule } from '../quizz-question/quizz-question.module';
import { QuizzScoreLogModule } from '../quizz-score-log/quizz-score-log.module';
import { QuizzActionLogModule } from '../quizz-action-log/quizz-action-log.module';
import { QuizzQuestionAnswerModule } from '../quizz-question-answer/quizz-question-answer.module';
import { QuizzLogQuestionAnswerModule } from '../quizz-log-question-answer/quizz-log-question-answer.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quizz.name, schema: QuizzSchema }]),
    forwardRef(() => AppModule),
    forwardRef(() => QuizzMatchLogModule),
    forwardRef(() => QuizzQuestionModule),
    QuizzScoreLogModule,
    QuizzActionLogModule,
    QuizzQuestionAnswerModule,
    QuizzLogQuestionAnswerModule,
  ],
  controllers: [QuizzController],
  providers: [QuizzService],
  exports: [QuizzService],
})
export class QuizzModule {}
