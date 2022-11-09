import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { QuizzLogQuestionAnsweredService } from './quizz-log-question-answered.service';
import { QuizzLogQuestionAnsweredController } from './quizz-log-question-answered.controller';
import { QuizLogQuestionAnswered } from './entities/quizz-log-question-answered.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizLogQuestionAnswered])],
  controllers: [QuizzLogQuestionAnsweredController],
  providers: [QuizzLogQuestionAnsweredService],
  exports: [QuizzLogQuestionAnsweredService],
})
export class QuizzLogQuestionAnsweredModule {}
