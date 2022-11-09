import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { QuizzActionLogService } from './quizz-action-log.service';
import { QuizzActionLogController } from './quizz-action-log.controller';
import { QuizActionLog } from './entities/quizz-action-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizActionLog])],
  controllers: [QuizzActionLogController],
  providers: [QuizzActionLogService],
  exports: [QuizzActionLogService],
})
export class QuizzActionLogModule {}
