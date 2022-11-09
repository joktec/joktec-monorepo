import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { QuizzService } from '../quizz/quizz.service';
import { QuizzMatchLogService } from '../quizz-match-log/quizz-match-log.service';

@Injectable()
export class TasksService {
  constructor(
    @Inject(forwardRef(() => QuizzService))
    private quizzService: QuizzService,
    @Inject(forwardRef(() => QuizzMatchLogService))
    private quizzMatchLogService: QuizzMatchLogService,
  ) {}

  // @Cron(CronExpression.EVERY_HOUR)
  // statisticDataQuizzCron() {
  //   this.quizzService.statisticDataQuizz();
  // }

  // @Cron(CronExpression.EVERY_MINUTE)
  // scanQuizzMatchLogTimeOutCron() {
  //   this.quizzMatchLogService.scanQuizzMatchLogTimeOut();
  // }
}
