import { Module } from '@nestjs/common';
import { QuizzLogQuestionAnswerService } from './quizz-log-question-answer.service';
import { QuizzLogQuestionAnswerController } from './quizz-log-question-answer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  QuizzLogQuestionAnswer,
  QuizzLogQuestionAnswerSchema,
} from './schemas/quizz-log-question-answer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: QuizzLogQuestionAnswer.name,
        schema: QuizzLogQuestionAnswerSchema,
      },
    ]),
  ],
  controllers: [QuizzLogQuestionAnswerController],
  providers: [QuizzLogQuestionAnswerService],
  exports: [QuizzLogQuestionAnswerService],
})
export class QuizzLogQuestionAnswerModule {}
