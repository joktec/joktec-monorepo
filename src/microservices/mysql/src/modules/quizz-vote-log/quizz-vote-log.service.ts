import { BaseService } from './../../service/base.service';
import { Inject, Injectable } from '@nestjs/common';
import { QuizVoteLog } from './entities/quizz-vote-log.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizzService } from '../quizz/quizz.service';
import { JobseekerService } from '../jobseeker/jobseeker.service';
import { uuidToInt } from '@jobhopin/core';
import { QuizzMatchLogService } from '../quizz-match-log/quizz-match-log.service';
import { QUIZZ_STATUS_FINISHED } from '../../contstants';

interface IVote {
  quiz: string;
  userId: string;
  voteStatus?: string;
}

@Injectable()
export class QuizzVoteLogService extends BaseService<QuizVoteLog> {
  constructor(
    @InjectRepository(QuizVoteLog)
    private quizVoteLogRepository: Repository<QuizVoteLog>,
    @Inject(JobseekerService)
    private jobseekerService: JobseekerService,
    @Inject(QuizzService)
    private quizzService: QuizzService,
    @Inject(QuizzMatchLogService)
    private quizzMatchLogService: QuizzMatchLogService,
  ) {
    super(quizVoteLogRepository);
  }

  async getQuizzVoteByJobSeeker({ quiz, userId }: IVote) {
    // check jobseeker info
    const jobseekerInfo = await this.jobseekerService.getByUserId(userId);
    const jobseekerId = jobseekerInfo.jobseekerId;

    const quizId: number = uuidToInt(quiz);
    const quizzVoteLog = await this.findOne({
      quizId,
      jobseekerId,
    });
    if (!quizzVoteLog) {
      return null;
    }
    const { voteStatus } = quizzVoteLog;
    console.log(quizzVoteLog, 'quizzVoteLog');

    const sumaryQuizzVoteResult = await this._sumaryQuizzVote(quiz);
    return {
      voteStatus,
      ...sumaryQuizzVoteResult,
    };
  }

  async vote({ quiz, userId, voteStatus }: IVote) {
    // check jobseeker info
    const jobseekerInfo = await this.jobseekerService.getByUserId(userId);
    const jobseekerId = jobseekerInfo.jobseekerId;

    // check quizz info
    const quizId: number = uuidToInt(quiz);
    const quizz = await this.quizzService.findById(quizId);
    if (!quizz) {
      throw new Error('Quizz not found');
    }

    // check complete quizz
    const quizzMatchLog = await this.quizzMatchLogService.findOne({
      quizId,
      jobseekerId,
    });
    if (!quizzMatchLog || quizzMatchLog.status !== QUIZZ_STATUS_FINISHED) {
      throw new Error('Vote failed. Please complete the quiz.');
    }

    const quizzVoteLog = await this.findOne({ quizId, jobseekerId });

    if (!quizzVoteLog) {
      await this.create({
        voteStatus,
        jobseekerId,
        quizId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      this.update(quizzVoteLog.id, {
        voteStatus,
        updatedAt: new Date(),
      });
    }
    const sumaryQuizzVoteResult = await this._sumaryQuizzVote(quizId);
    return {
      voteStatus,
      ...sumaryQuizzVoteResult,
    };
  }

  private async _sumaryQuizzVote(quizzId) {
    const numberOfVote = await this.count({
      quizId: quizzId,
      voteStatus: In(['UP_VOTE', 'DOWN_VOTE']),
    });
    const upvotePercent = Math.floor(
      ((await this.count({
        quizId: quizzId,
        voteStatus: 'UP_VOTE',
      })) /
        numberOfVote) *
        100,
    );
    return {
      upvotePercent,
      numberOfVote,
    };
  }
}
