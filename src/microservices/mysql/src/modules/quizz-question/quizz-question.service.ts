import { BaseService } from './../../service/base.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { QuizQuestion } from './entities/quizz-question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import {
  IAnswer,
  ICheckAnswer,
  IGenMetaData,
  IUpdateScore,
} from './quizz-queston.interface';
import { JobseekerService } from '../jobseeker/jobseeker.service';
import { uuidToInt } from '@jobhopin/core';
import {
  QUIZZ_MODE_PRIVATE,
  QUIZZ_STATUS_ACTIVE,
  QUIZZ_STATUS_FINISHED,
  QUIZZ_TYPE_TIMER,
} from '../../contstants';
import * as moment from 'moment';
import { QuizzMatchLogService } from '../quizz-match-log/quizz-match-log.service';
import { QuizzLogQuestionAnsweredService } from '../quizz-log-question-answered/quizz-log-question-answered.service';
import { QuizzQuestionAnswerService } from '../quizz-question-answer/quizz-question-answer.service';
import { QuizzScoreLogService } from '../quizz-score-log/quizz-score-log.service';
import { QuizzService } from '../quizz/quizz.service';

@Injectable()
export class QuizzQuestionService extends BaseService<QuizQuestion> {
  constructor(
    @InjectRepository(QuizQuestion)
    private quizQuestionRepository: Repository<QuizQuestion>,
    @Inject(JobseekerService)
    private jobseekerService: JobseekerService,
    @Inject(forwardRef(() => QuizzService))
    private quizzService: QuizzService,
    @Inject(QuizzMatchLogService)
    private quizzMatchLogService: QuizzMatchLogService,
    @Inject(QuizzLogQuestionAnsweredService)
    private quizzLogQuestionAnsweredService: QuizzLogQuestionAnsweredService,
    @Inject(QuizzQuestionAnswerService)
    private quizzQuestionAnswerService: QuizzQuestionAnswerService,
    @Inject(QuizzScoreLogService)
    private quizzScoreLogService: QuizzScoreLogService,
  ) {
    super(quizQuestionRepository);
  }

  async answer({ answers, answertext, question, userId }: IAnswer) {
    // check jobseeker info
    const jobseekerInfo = await this.jobseekerService.getByUserId(userId);
    const jobseekerId = jobseekerInfo.jobseekerId;

    // convert id answers
    const answersIds = answers.map((a) => uuidToInt(a));

    // check question of quizz
    const questionId: number = uuidToInt(question);
    const questionObject = await this.findById(questionId);
    if (!questionObject) {
      throw new Error('Question not found');
    }

    // check quizz info
    const quizzObject = await this.quizzService.findById(questionObject.quizId);
    if (!quizzObject) {
      throw new Error('Quizz not found');
    }
    if (Number(quizzObject.isActive) !== QUIZZ_STATUS_ACTIVE) {
      throw new Error('Quizz is inactive');
    }

    // check quizz match log of jobseeker
    const quizzMatchLogObject = await this.quizzMatchLogService.findOne({
      quizId: questionObject.quizId,
      jobseekerId,
      replayMatchId: IsNull(),
    });

    if (!quizzMatchLogObject) {
      throw new Error('Quizz match log not found');
    }
    if (quizzMatchLogObject.status === QUIZZ_STATUS_FINISHED) {
      throw new Error('Quizz match is complete');
    }
    const questionOrder = quizzMatchLogObject.questionOrder.split(',');
    if (!questionOrder.includes(String(questionId))) {
      throw new Error('Question is not in match log');
    }

    // check time out quizz with type TIMER
    if (quizzObject.type === QUIZZ_TYPE_TIMER) {
      // check time out quizz & handle play again
      const quizzMatchExpried = moment(quizzMatchLogObject.createdAt).add(
        quizzObject.duration,
        'seconds',
      );
      if (quizzObject.duration && quizzMatchExpried < moment()) {
        await this.quizzMatchLogService.update(quizzMatchLogObject.id, {
          status: QUIZZ_STATUS_FINISHED,
          isTimeOut: 1,
          finishedAt: new Date(),
          updatedAt: new Date(),
        });
        throw new Error('Quizz match is time out');
      }
    }

    // check log answerd of question
    const answeredOfQuestion =
      await this.quizzLogQuestionAnsweredService.findOne({
        quizMatchId: quizzMatchLogObject.id,
        questionId: questionObject.id,
      });
    if (answeredOfQuestion) {
      throw new Error('You already answered this question');
    }

    // check answer & create answered log
    const checkAnswerData: any = await this._checkAnswer({
      questionId: questionObject.id,
      answersIds,
    });
    const scoreAnswered = checkAnswerData.isCorrectAnswer
      ? questionObject.score
      : 0;
    const dataAnsweredLog = {
      quizMatchId: quizzMatchLogObject.id,
      questionId: questionObject.id,
      isCorrect: Number(checkAnswerData.isCorrectAnswer),
      score: scoreAnswered,
      answers: answersIds.join(','),
      correctAnswers: checkAnswerData.correctAnswers.join(','),
      metaData: JSON.stringify(
        this._generateMetaData({
          questionObject,
          answerList: checkAnswerData.metaDataList,
        }),
      ),
      usedHint: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.quizzLogQuestionAnsweredService.create(dataAnsweredLog);

    // update score quizz match log
    const quizzMatchLogUpdate = await this._updateScore({
      quizzMatchLogObject,
      jobseekerId,
      scoreAnswered,
      quizzObject,
    });

    // serializer score & totalScore with quizz type timer
    const score = quizzObject.type === QUIZZ_TYPE_TIMER ? 0 : scoreAnswered;
    const totalScore =
      quizzObject.type === QUIZZ_TYPE_TIMER ? 0 : quizzMatchLogUpdate.score;
    return {
      ...quizzMatchLogUpdate,
      isCorrect: Number(checkAnswerData.isCorrectAnswer),
      explanation: questionObject.explanation,
      score,
      totalScore,
    };
  }

  async _updateScore({
    quizzMatchLogObject,
    jobseekerId,
    scoreAnswered,
    quizzObject,
  }: IUpdateScore) {
    //count question answered
    const questionOrder = quizzMatchLogObject.questionOrder.split(',');
    const numberOfQuestions = questionOrder.length;
    const questionsAnswered = await this.quizzLogQuestionAnsweredService.count({
      quizMatchId: quizzMatchLogObject.id,
    });
    const finishedPercent =
      numberOfQuestions > 0
        ? Math.round((questionsAnswered * 100) / numberOfQuestions)
        : 0;
    const totalScore = Number(quizzMatchLogObject.score) + scoreAnswered;
    // finish quizz
    let dataUpdateFinished = {};
    if (finishedPercent >= 100) {
      dataUpdateFinished = {
        finishedAt: new Date(),
        status: QUIZZ_STATUS_FINISHED,
      };
      //ignore: handle assessment task finished
    }
    const matchLogData = await this.quizzMatchLogService.update(
      quizzMatchLogObject.id,
      {
        finishedPercent,
        score: totalScore,
        updatedAt: new Date(),
        ...dataUpdateFinished,
      },
    );

    // update score log if not quizz timer or quizz mode private
    const isAddScoreQuizz =
      (quizzObject.type === QUIZZ_TYPE_TIMER && finishedPercent < 100) ||
      quizzObject.mode === QUIZZ_MODE_PRIVATE;
    if (!isAddScoreQuizz) {
      const quizzScoreLogObject = await this.quizzScoreLogService.findOne({
        quizMatchId: quizzMatchLogObject.id,
        jobseekerId,
      });
      await this.quizzScoreLogService.update(quizzScoreLogObject.id, {
        score: totalScore,
        updatedAt: new Date(),
      });
    }
    return matchLogData;
  }

  async _checkAnswer({ questionId, answersIds }: ICheckAnswer) {
    const answersOfQuestion = await this.quizzQuestionAnswerService.findBy({
      questionId,
    });
    const correctAnswers = [];
    const userCorrects = [];
    const metaDataList = [];
    answersOfQuestion.forEach((item) => {
      if (!!item.isCorrectAnswer) {
        correctAnswers.push(item.id);
        if (answersIds.includes(item.id)) {
          userCorrects.push(item.id);
        }
      }

      // using format in DB
      metaDataList.push({
        id: item.id,
        answer: item.answer,
        answer_vi: item.answerVi,
        is_correct_answer: item.isCorrectAnswer,
      });
    });
    const isCorrectAnswer =
      correctAnswers.length === userCorrects.length &&
      userCorrects.length === answersIds.length;
    return {
      isCorrectAnswer,
      correctAnswers,
      metaDataList,
    };
  }

  _generateMetaData({ questionObject, answerList }: IGenMetaData) {
    return {
      // using format in DB
      question: {
        id: questionObject._id,
        question: questionObject.question,
        score: questionObject.score,
        is_multi_answer: questionObject.isMultiAnswer,
      },
      answers_list: answerList,
    };
  }
}
