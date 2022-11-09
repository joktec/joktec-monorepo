import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { QuizzMatchLogService } from '../quizz-match-log/quizz-match-log.service';

@Injectable()
export class TasksService {
  constructor(
    @Inject(forwardRef(() => QuizzMatchLogService))
    private quizzMatchLogService: QuizzMatchLogService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  scanQuizzMatchLogTimeOutCron() {
    this.quizzMatchLogService.scanQuizzMatchLogTimeOut();
  }
}
