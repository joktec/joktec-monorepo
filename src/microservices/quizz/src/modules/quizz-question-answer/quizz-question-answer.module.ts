import { Module } from '@nestjs/common';
import { QuizzQuestionAnswerService } from './quizz-question-answer.service';
import { QuizzQuestionAnswerController } from './quizz-question-answer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  QuizzQuestionAnswer,
  QuizzQuestionAnswerSchema,
} from './schemas/quizz-question-answer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuizzQuestionAnswer.name, schema: QuizzQuestionAnswerSchema },
    ]),
  ],
  controllers: [QuizzQuestionAnswerController],
  providers: [QuizzQuestionAnswerService],
  exports: [QuizzQuestionAnswerService],
})
export class QuizzQuestionAnswerModule {}
