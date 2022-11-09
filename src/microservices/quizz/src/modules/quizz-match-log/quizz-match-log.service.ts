import { BaseService, Query } from '@jobhopin/core';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  QUIZZ_TYPE_TIMER,
  QUIZZ_STATUS_ACTIVE,
  QUIZZ_STATUS_PLAYING,
  QUIZZ_STATUS_FINISHED,
} from '../../constatns';
import * as moment from 'moment';
import {
  QuizzMatchLog,
  QuizzMatchLogDocument,
} from './schemas/quizz-match-log.schema';
import { AppService } from '../../app.service';
import { QuizzService } from '../quizz/quizz.service';
import { IMatchLogMe } from './quizz-match-log.interface';

@Injectable()
export class QuizzMatchLogService extends BaseService<QuizzMatchLogDocument> {
  constructor(
    @InjectModel(QuizzMatchLog.name)
    private quizzMatchLogModel: Model<QuizzMatchLogDocument>,
    @Inject(forwardRef(() => AppService))
    private readonly appService: AppService,
    @Inject(forwardRef(() => QuizzService))
    private readonly quizzService: QuizzService,
  ) {
    super(quizzMatchLogModel);
  }

  async matchLogMe(params: IMatchLogMe) {
    const { condition, pagination } = params;
    const { userId } = condition;
    // check jobseeker info
    const jobseekerInfo = await this.appService.getJobseekerByUserId(userId);
    const jobseeker = jobseekerInfo._id;

    // change userId to jobseeker into condition
    const newCondition = { ...condition };
    delete newCondition.userId;
    newCondition.jobseeker = jobseeker;

    return await this.query(newCondition, pagination);
  }

  async scanQuizzMatchLogTimeOut() {
    const quizzesTypeTimer = await this.quizzService.findAllCustom({
      type: QUIZZ_TYPE_TIMER,
      isActive: QUIZZ_STATUS_ACTIVE,
    });

    const quizzesTypeTimerIds = quizzesTypeTimer.map((q) => q._id);

    const quizzMatchLogs = await this.quizzMatchLogModel
      .find({ quiz: quizzesTypeTimerIds, status: QUIZZ_STATUS_PLAYING })
      .exec();

    quizzMatchLogs.map((quizzMatch) => {
      // check time out quizz & handle play again
      const quizzObject = quizzesTypeTimer.find(
        (q) => q._id === quizzMatch.quiz,
      );

      if (!quizzObject) {
        return;
      }
      const quizzMatchExpried = moment(quizzMatch.createdAt).add(
        quizzObject.duration,
        'seconds',
      );
      if (quizzObject.duration && quizzMatchExpried < moment()) {
        quizzMatch.status = QUIZZ_STATUS_FINISHED;
        quizzMatch.isTimeOut = 1;
        quizzMatch.finishedAt = new Date();
        quizzMatch.updatedAt = new Date();
        quizzMatch.save();
      }
    });
  }
}
