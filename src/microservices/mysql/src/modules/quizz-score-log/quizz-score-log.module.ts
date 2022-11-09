import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { QuizzScoreLogService } from './quizz-score-log.service';
import { QuizzScoreLogController } from './quizz-score-log.controller';
import { QuizScoreLog } from './entities/quizz-score-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizScoreLog])],
  controllers: [QuizzScoreLogController],
  providers: [QuizzScoreLogService],
  exports: [QuizzScoreLogService],
})
export class QuizzScoreLogModule {}
