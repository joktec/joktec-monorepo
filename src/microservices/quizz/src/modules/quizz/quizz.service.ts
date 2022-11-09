import {
  BaseService,
  QuizzConditionInput,
  QuizzPaginationInput,
} from '@jobhopin/core';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quizz, QuizzDocument } from './schemas/quizz.schema';
import {
  ACTION_VIEW,
  QUIZZ_STATUS_ACTIVE,
  QUIZZ_STATUS_PLAYING,
} from './../../constatns';
import { IMyOverall } from './quizz.interface';
import { AppService } from '../../app.service';
import { QuizzMatchLogService } from '../quizz-match-log/quizz-match-log.service';
import { QuizzActionLogService } from '../quizz-action-log/quizz-action-log.service';
import { QuizzLogQuestionAnswerService } from '../quizz-log-question-answer/quizz-log-question-answer.service';
@Injectable()
export class QuizzService extends BaseService<
  QuizzDocument,
  QuizzConditionInput,
  QuizzPaginationInput
> {
  constructor(
    @InjectModel(Quizz.name) private quizzModel: Model<QuizzDocument>,
    @Inject(forwardRef(() => AppService))
    private readonly appService: AppService,
    @Inject(forwardRef(() => QuizzMatchLogService))
    private readonly quizzMatchLogService: QuizzMatchLogService,
    @Inject(forwardRef(() => QuizzActionLogService))
    private readonly quizzActionLogService: QuizzActionLogService,
    @Inject(forwardRef(() => QuizzLogQuestionAnswerService))
    private readonly quizzLogQuestionAnswerService: QuizzLogQuestionAnswerService,
  ) {
    super(quizzModel);
  }

  async myOverall({ quiz, userId }: IMyOverall) {
    // check jobseeker info
    const jobseekerInfo = await this.appService.getJobseekerByUserId(userId);
    const jobseeker = jobseekerInfo._id;

    // check quizz info
    const quizzObject = await this._checkQuizzInfo(quiz);

    // get quizz match log & log answerd correct
    const quizzMatchLog = await this.quizzMatchLogService.findOneCustom({
      quiz: quizzObject._id,
      jobseeker,
      replayMatch: null,
    });
    if (!quizzMatchLog) {
      return {
        quizzMatchLog: null,
      };
    }

    // get quizz log answered
    const questionAnsweredLog =
      await this.quizzLogQuestionAnswerService.findAllCustom({
        quizMatch: quizzMatchLog._id,
      });

    console.log(questionAnsweredLog, 'questionAnsweredLog');  

    return {
      ...this.transform(quizzMatchLog),
      quizzMatchLog: quizzMatchLog._id,
      questionAnsweredLog,
    };
  }

  private async _checkQuizzInfo(quiz: string) {
    const quizzObject = await this.quizzModel.findById(quiz).exec();
    if (!quizzObject) {
      throw new Error('Quizz not found');
    }
    if (quizzObject.isActive !== QUIZZ_STATUS_ACTIVE) {
      throw new Error('Quizz is in active');
    }
    return quizzObject;
  }

  private async countPlayers(quizz) {
    return await this.quizzMatchLogService.countCustom({
      quiz: quizz._id,
      status: QUIZZ_STATUS_PLAYING,
    });
  }

  private async countVisitors(quizz) {
    return await this.quizzActionLogService.countCustom({
      quiz: quizz._id,
      action: ACTION_VIEW,
    });
  }
}
