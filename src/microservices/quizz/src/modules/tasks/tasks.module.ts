import { Module, forwardRef } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { QuizzModule } from '../quizz/quizz.module';
import { QuizzMatchLogModule } from '../quizz-match-log/quizz-match-log.module';

@Module({
  imports: [
    forwardRef(() => QuizzModule),
    forwardRef(() => QuizzMatchLogModule),
  ],
  providers: [TasksService],
})
export class TasksModule {}
