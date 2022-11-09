import { Module, forwardRef } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { QuizzMatchLogModule } from '../quizz-match-log/quizz-match-log.module';

@Module({
  imports: [forwardRef(() => QuizzMatchLogModule)],
  providers: [TasksService],
})
export class TasksModule {}
