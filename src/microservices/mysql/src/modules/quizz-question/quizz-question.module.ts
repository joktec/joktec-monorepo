import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { QuizzQuestionService } from './quizz-question.service';
import { QuizzQuestionController } from './quizz-question.controller';
import { QuizQuestion } from './entities/quizz-question.entity';
import { JobseekerModule } from '../jobseeker/jobseeker.module';
import { QuizzQuestionAnswerModule } from '../quizz-question-answer/quizz-question-answer.module';
import { QuizzMatchLogModule } from '../quizz-match-log/quizz-match-log.module';
import { QuizzLogQuestionAnsweredModule } from '../quizz-log-question-answered/quizz-log-question-answered.module';
import { QuizzScoreLogModule } from '../quizz-score-log/quizz-score-log.module';
import { QuizzModule } from '../quizz/quizz.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizQuestion]),
    JobseekerModule,
    forwardRef(() => QuizzModule),
    QuizzMatchLogModule,
    QuizzQuestionAnswerModule,
    QuizzLogQuestionAnsweredModule,
    QuizzScoreLogModule,
  ],
  controllers: [QuizzQuestionController],
  providers: [QuizzQuestionService],
  exports: [QuizzQuestionService],
})
export class QuizzQuestionModule {}
