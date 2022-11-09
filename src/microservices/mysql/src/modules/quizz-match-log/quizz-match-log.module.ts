import { Module, forwardRef } from '@nestjs/common';
import { QuizzMatchLogService } from './quizz-match-log.service';
import { QuizzMatchLogController } from './quizz-match-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizMatchLog } from './entities/quizz-match-log.entity';
import { QuizzModule } from '../quizz/quizz.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizMatchLog]),
    forwardRef(() => QuizzModule),
  ],
  controllers: [QuizzMatchLogController],
  providers: [QuizzMatchLogService],
  exports: [QuizzMatchLogService],
})
export class QuizzMatchLogModule {}
