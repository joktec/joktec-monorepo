import { In, Repository } from 'typeorm';
import { BaseService } from '../../service/base.service';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { QuizMatchLog } from './entities/quizz-match-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  QUIZZ_STATUS_ACTIVE,
  QUIZZ_STATUS_FINISHED,
  QUIZZ_STATUS_PLAYING,
  QUIZZ_TYPE_TIMER,
} from '../../contstants';
import * as moment from 'moment';
import { QuizzService } from '../quizz/quizz.service';

@Injectable()
export class QuizzMatchLogService extends BaseService<QuizMatchLog> {
  constructor(
    @InjectRepository(QuizMatchLog)
    private quizMatchLogRepository: Repository<QuizMatchLog>,
    @Inject(forwardRef(() => QuizzService))
    private quizzService: QuizzService,
  ) {
    super(quizMatchLogRepository);
  }

  async scanQuizzMatchLogTimeOut() {
    const quizzesTypeTimer = await this.quizzService.findBy({
      type: QUIZZ_TYPE_TIMER,
      isActive: !!QUIZZ_STATUS_ACTIVE,
    });

    const quizzesTypeTimerIds = quizzesTypeTimer.map((q) => q.id);

    const quizzMatchLogs = await this.quizMatchLogRepository.findBy({
      quizId: In(quizzesTypeTimerIds),
      status: QUIZZ_STATUS_PLAYING,
    });

    quizzMatchLogs.map((quizzMatch) => {
      // check time out quizz & handle play again
      const quizzObject = quizzesTypeTimer.find(
        (q) => q.id === quizzMatch.quizId,
      );

      if (!quizzObject) {
        return;
      }
      const quizzMatchExpried = moment(quizzMatch.createdAt).add(
        quizzObject.duration,
        'seconds',
      );
      if (quizzObject.duration && quizzMatchExpried < moment()) {
        this.update(quizzMatch.id, {
          status: QUIZZ_STATUS_FINISHED,
          isTimeOut: 1,
          finishedAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });
  }
}
