import { Module } from '@nestjs/common';
import { QuizzQuestionAnswerService } from './quizz-question-answer.service';
import { QuizzQuestionAnswerController } from './quizz-question-answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizQuestionAnswer } from './entities/quizz-question-answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizQuestionAnswer])],
  controllers: [QuizzQuestionAnswerController],
  providers: [QuizzQuestionAnswerService],
  exports: [QuizzQuestionAnswerService],
})
export class QuizzQuestionAnswerModule {}
