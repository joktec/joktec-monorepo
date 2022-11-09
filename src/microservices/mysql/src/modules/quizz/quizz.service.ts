import { BaseService } from './../../service/base.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Quiz } from './entities/quizz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, IsNull } from 'typeorm';
import {
  ICheckIn,
  ICreateMyMatchLog,
  IHandlePlayAgain,
  IHandlePlayGame,
  IPlay,
  IHandleCalculateRemainTurn,
  IHanleEarnCheckIn,
} from './quizz.interface';
import { JobseekerService } from '../jobseeker/jobseeker.service';
import { QuizzMatchLogService } from '../quizz-match-log/quizz-match-log.service';
import { QuizzQuestionService } from '../quizz-question/quizz-question.service';
import { QuizzScoreLogService } from '../quizz-score-log/quizz-score-log.service';
import { QuizzActionLogService } from '../quizz-action-log/quizz-action-log.service';
import { GameTurnLogService } from '../game-turn-log/game-turn-log.service';
import { GameScoreTurnLogService } from '../game-score-turn-log/game-score-turn-log.service';
import {
  ACTION_PLAY,
  ACTION_CHECKIN,
  QUIZZ_STATUS_ACTIVE,
  QUIZZ_STATUS_FINISHED,
  QUIZZ_STATUS_PLAYING,
  QUIZZ_TYPE_TIMER,
  SCORE_TYPE_QUIZZ,
  QUIZZ_RESULT_STATUS_PENDING,
  TURN_ACTION_PLAY_TIMER_QUIZ,
  ACTION_PLAY_TIMER_QUIZ_KEY,
  CLAIMED_YES,
  VISIBLE_NO,
  READ_NO,
  IS_TIMEOUT_NO,
  IS_TIMEOUT_YES,
  ActionsTurnValue,
} from '../../contstants';
import * as moment from 'moment';
import { intToUuid, uuidToInt } from '@jobhopin/core';

@Injectable()
export class QuizzService extends BaseService<Quiz> {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @Inject(JobseekerService)
    private jobseekerService: JobseekerService,
    @Inject(forwardRef(() => QuizzMatchLogService))
    private quizzMatchLogService: QuizzMatchLogService,
    @Inject(QuizzQuestionService)
    private quizzQuestionService: QuizzQuestionService,
    @Inject(QuizzScoreLogService)
    private quizzScoreLogService: QuizzScoreLogService,
    @Inject(QuizzActionLogService)
    private quizzActionLogService: QuizzActionLogService,
    @Inject(GameTurnLogService)
    private gameTurnLogService: GameTurnLogService,
    @Inject(GameScoreTurnLogService)
    private gameScoreTurnLogService: GameScoreTurnLogService,
  ) {
    super(quizRepository);
  }

  /**
   * Check in
   * @param param0
   * @returns
   */
  async checkIn({ userId, quiz }: ICheckIn) {
    // check jobseeker info
    const jobseekerInfo = await this.jobseekerService.getByUserId(userId);
    const jobseekerId = jobseekerInfo.jobseekerId;

    // check quizz info
    const quizId: number = uuidToInt(quiz);
    await this._checkQuizzInfo(quizId);

    // check user new checkIn in day
    const checkInAt = moment().startOf('day');
    const checkInToDay = await this.quizzActionLogService.findOne({
      action: ACTION_CHECKIN,
      createdAt: MoreThanOrEqual(checkInAt.toDate()),
    });

    // create action log checkIn if first checkIn day
    if (!checkInToDay) {
      this.quizzActionLogService.create({
        action: ACTION_CHECKIN,
        jobseekerId,
        quizId,
        isClaimedCheckin: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      this._handleEarnCheckIn({
        jobseekerId,
        checkInAt,
      });
    }

    return {
      checkInAt,
    };
  }

  //TODO:: handle earn turn from checkin
  private async _handleEarnCheckIn({
    jobseekerId,
    checkInAt,
  }: IHanleEarnCheckIn) {
    console.log(jobseekerId, checkInAt);
  }

  /**
   * Play quizz
   * @param param0
   * @returns
   */
  async play({ quiz, userId }: IPlay) {
    // check jobseeker info
    const jobseekerInfo = await this.jobseekerService.getByUserId(userId);
    const jobseekerId = jobseekerInfo.jobseekerId;

    // check quizz info
    const quizId: number = uuidToInt(quiz);
    const quizzObject = await this._checkQuizzInfo(quizId);

    // TODO:: check quizz of event

    // check remain turn of jobseeker with quizz not free to play
    if (!quizzObject.isFreeToPlay) {
      const gameTurnLogJobseeker = await this.gameScoreTurnLogService.findOne({
        jobseekerId,
      });
      if (gameTurnLogJobseeker && gameTurnLogJobseeker.remainingTurn <= 0) {
        throw new Error('You do not have enough turn');
      }
    }

    // check match log of quizz
    let resData;
    const quizzMatchLogObject = await this.quizzMatchLogService.findOne({
      quizId: quizzObject.id,
      jobseekerId,
      replayMatchId: IsNull(),
    });
    if (!quizzMatchLogObject) {
      // handle play new game if not exists
      const quizzMatchNewObject = await this._handlePlayGame({
        quizzObject,
        jobseekerId,
      });
      resData = quizzMatchNewObject;
    } else {
      resData = quizzMatchLogObject;
      if (quizzObject?.type === QUIZZ_TYPE_TIMER) {
        // check time out quizz & handle play again
        const quizzMatchExpried = moment(quizzMatchLogObject.createdAt).add(
          quizzObject.duration,
          'seconds',
        );
        if (
          (quizzObject.duration && quizzMatchExpried < moment()) ||
          quizzMatchLogObject.status === QUIZZ_STATUS_FINISHED
        ) {
          const quizzMatchLogPlayAgain = await this._handlePlayAgain({
            quizzObject,
            jobseekerId,
            quizzMatchLogObject,
          });
          resData = quizzMatchLogPlayAgain;

          // quizz timer with game turn
          if (!quizzObject.isFreeToPlay) {
            this._handleCalculateRemainTurn({
              jobseekerId,
              quizzMatchLogId: quizzMatchLogObject.id,
            });
          }
        }
      }
    }

    // create quizz action log
    this.quizzActionLogService.create({
      jobseekerId,
      quizId: quizzObject.id,
      action: ACTION_PLAY,
      isClaimedCheckin: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // convert id to response
    const arrQuestionOrder = resData.questionOrder.split(',');
    const questionOrder = arrQuestionOrder.map((q) => intToUuid(q));

    return {
      ...resData,
      quizzMatchLog: intToUuid(resData.id),
      questionOrder,
    };
  }

  private async _checkQuizzInfo(quizId: number) {
    const quizzObject = await this.findById(quizId);
    if (!quizzObject) {
      throw new Error('Quizz not found');
    }
    if (Number(quizzObject.isActive) !== QUIZZ_STATUS_ACTIVE) {
      throw new Error('Quizz is in active');
    }
    return quizzObject;
  }

  private async _handlePlayGame({ quizzObject, jobseekerId }: IHandlePlayGame) {
    const quizzMatchLogObject = await this._createMyMatchLog({
      quizzObject,
      jobseekerId,
    });
    // create quizz score log
    this.quizzScoreLogService.create({
      jobseekerId,
      quizMatchId: quizzMatchLogObject.id,
      scoreType: SCORE_TYPE_QUIZZ,
      score: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return quizzMatchLogObject;
  }

  private async _handlePlayAgain({
    quizzObject,
    jobseekerId,
    quizzMatchLogObject,
  }: IHandlePlayAgain) {
    // create quizz match log
    const quizzMatchLogNewObject = await this._createMyMatchLog({
      quizzObject,
      jobseekerId,
    });

    // update status & replayMatch of quizz match log old
    this.quizzMatchLogService.update(quizzMatchLogObject.id, {
      replayMatchId: quizzMatchLogNewObject.id,
      status: QUIZZ_STATUS_FINISHED,
      isTimeOut: IS_TIMEOUT_YES,
      updatedAt: new Date(),
    });

    // update score or create new quizz score log
    const quizzScoreLogObject = await this.quizzScoreLogService.findOne({
      quizMatchId: quizzMatchLogObject.id,
    });
    if (quizzScoreLogObject) {
      this.quizzScoreLogService.update(quizzScoreLogObject.id, {
        quizMatchId: quizzMatchLogNewObject.id,
        score: 0,
        updatedAt: new Date(),
      });
    } else {
      this.quizzScoreLogService.create({
        jobseekerId,
        scoreType: SCORE_TYPE_QUIZZ,
        quizMatchId: quizzMatchLogNewObject.id,
        score: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return quizzMatchLogNewObject;
  }

  private async _handleCalculateRemainTurn({
    jobseekerId,
    quizzMatchLogId,
  }: IHandleCalculateRemainTurn) {
    // create game turn log with timer
    await this.gameTurnLogService.create({
      jobseekerId,
      action: ACTION_PLAY_TIMER_QUIZ_KEY,
      turn: TURN_ACTION_PLAY_TIMER_QUIZ,
      metaData: JSON.stringify({
        match_obj_id: quizzMatchLogId,
      }),
      isVisible: VISIBLE_NO,
      isRead: READ_NO,
      isClaimed: CLAIMED_YES,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // update reamining turn of jobseeker
    const turnListJobseeker = await this.gameTurnLogService.findBy({
      jobseekerId,
      isClaimed: CLAIMED_YES,
    });
    if (Array.isArray(turnListJobseeker)) {
      const remainingTurn = turnListJobseeker.reduce(
        (sum: number, a) => sum + a.turn,
        0,
      );
      const gameScoreTurnJobseeker = await this.gameScoreTurnLogService.findOne(
        { jobseekerId },
      );
      this.gameScoreTurnLogService.update(gameScoreTurnJobseeker.id, {
        remainingTurn,
        updatedAt: new Date(),
      });
    }
  }

  private async _createMyMatchLog({
    quizzObject,
    jobseekerId,
  }: ICreateMyMatchLog) {
    // gernerate question list
    const questions = await this.quizzQuestionService.findBy({
      quizId: quizzObject.id,
    });

    // create match log with question random
    const numberOfQuestions = quizzObject.numberOfQuestions;
    const questionOrder = this._randomListWithLength({
      list: questions,
      length: numberOfQuestions,
    });

    const quizMatchLogObject = await this.quizzMatchLogService.create({
      quizId: quizzObject.id,
      jobseekerId,
      questionOrder: questionOrder.join(','),
      status: QUIZZ_STATUS_PLAYING,
      score: 0,
      finishedPercent: 0,
      isTimeOut: IS_TIMEOUT_NO,
      finalScore: 0,
      resultStatus: QUIZZ_RESULT_STATUS_PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return quizMatchLogObject;
  }

  private _randomListWithLength({ list, length }) {
    const randoms = [].concat(list);
    randoms.sort(function () {
      return 0.5 - Math.random();
    });
    return randoms.slice(0, length).map((item) => item.id);
  }

  async handleUpdateRemainingTurn({ jobseekerId }) {
    console.log('handleUpdateRemainingTurn', jobseekerId)
    const gameScoreTurnLog = await this.gameScoreTurnLogService.findOne({ jobseekerId })
    if (!gameScoreTurnLog) {
      throw new Error(`GameScoreTurnLog: jobseekerId ${jobseekerId} not found`)
    }
    const remainingTurn = await this.gameTurnLogService.calculateRemainingTurn(jobseekerId);
    console.log('handleUpdateRemainingTurn', { gameScoreTurnLogId: gameScoreTurnLog.id, remainingTurn, updatedAt: new Date() })
    const updated = await this.gameScoreTurnLogService.update(gameScoreTurnLog.id, { remainingTurn, updatedAt: new Date() })
    console.log('updated gameScoreTurnLog', updated)
  }

  async handleGameTopUp({ jobseekerId, action, extraData, turn, hiddenTopUp }) {
    if (!extraData) extraData = {}
    console.log('handleGameTopUp starting...')
    let data: any = {
      isRead: 0,
      isVisible: 1,
      isClaimed: 0
    }
    if (!turn) {
      turn = ActionsTurnValue[action]
    }
    data = {
      ...data,
      jobseekerId,
      action,
      turn,
      metaData: extraData,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    if (hiddenTopUp) {
      data.isVisible = 0;
      data.isRead = 1;
      data.isClaimed = 1;
    }
    const gameTurnLog = await this.gameTurnLogService.create(data)
    this.handleUpdateRemainingTurn({ jobseekerId })
    console.log(`handleGameTopUp done`, gameTurnLog)
  }
}
