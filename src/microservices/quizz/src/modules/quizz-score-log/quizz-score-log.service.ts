import {
  QuizzScoreLog,
  QuizzScoreLogDocument,
} from './schemas/quizz-score-log.schema';

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import * as moment from 'moment';
import {
  RANKING_RANGE_WEEKY,
  RANKING_RANGE_ALL,
  SCORE_TYPE_QUIZZ,
  WEEKLY_DAYS,
} from './../../constatns';
import {
  IGetListRanking,
  IGetPositionJobseeker,
} from './quizz-score-log.interface';
import { AppService } from '../../app.service';
import { QuizzMatchLogService } from '../quizz-match-log/quizz-match-log.service';
@Injectable()
export class QuizzScoreLogService extends BaseService<QuizzScoreLogDocument> {
  constructor(
    @InjectModel(QuizzScoreLog.name)
    private quizzScoreLogModel: Model<QuizzScoreLogDocument>,
    @Inject(forwardRef(() => AppService))
    private readonly appService: AppService,
    private quizzMatchLogService: QuizzMatchLogService,
  ) {
    super(quizzScoreLogModel);
  }

  async getListRanking({
    condition,
    pagination,
  }: IGetListRanking): Promise<any> {
    let defaultPagination = {
      page: 1,
      pageSize: 20,
    } as any;
    if (pagination) {
      defaultPagination = {
        ...defaultPagination,
        ...pagination,
      };
    }

    // filter by quizz_id
    let filterQuizz = {};
    if (condition?.quiz) {
      const matchLogs = await this.quizzMatchLogService.findAllCustom({
        quiz: condition?.quiz,
      });
      const matchLogIds = matchLogs.map((item) => item._id);
      filterQuizz = {
        quizMatch: { $in: matchLogIds },
      };
    }

    // filter date with type WEEKLY or ALL
    let filterRange = {};
    const range = condition?.range || RANKING_RANGE_ALL;
    if (range === RANKING_RANGE_WEEKY) {
      filterRange = {
        createdAt: {
          $gte: moment().startOf('day').subtract(WEEKLY_DAYS, 'days').toDate(),
          $lt: moment().startOf('day').toDate(),
        },
      };
    }

    // filter jobsseeker
    let filterJobseeker = {};
    if (condition?.userId) {
      // check jobseeker info
      const jobseekerInfo = await this.appService.getJobseekerByUserId(
        condition?.userId,
      );
      const jobseeker = jobseekerInfo._id;

      filterJobseeker = {
        jobseeker,
      };
    }

    const { page, pageSize } = defaultPagination;
    const skip = (page - 1) * pageSize;
    const match = {
      scoreType: SCORE_TYPE_QUIZZ,
      ...filterQuizz,
      ...filterRange,
      ...filterJobseeker,
    };

    const documents = await this.quizzScoreLogModel
      .aggregate([
        {
          $match: match,
        },
        {
          $group: {
            _id: '$jobseeker',
            totalScore: {
              $sum: {
                $toInt: '$score',
              },
            },
          },
        },
        {
          $sort: {
            totalScore: -1,
          },
        },
      ])
      .skip(skip)
      .limit(pageSize)
      .exec();

    let items;

    // get position of ranking with me
    if (
      condition?.userId &&
      Array.isArray(documents) &&
      documents.length === 1
    ) {
      const [item] = documents;
      const position = await this._getPositionJobseeker({
        match,
      });
      items = [
        {
          ...item,
          jobseeker: item._id,
          position,
        },
      ];
    } else {
      items = documents.map((document, index) => {
        return {
          jobseeker: document._id,
          totalScore: document.totalScore,
          position: index + 1,
        };
      });
    }

    const response = {
      items,
      condition: condition,
      pagination: defaultPagination,
    };

    return response;
  }

  async _getPositionJobseeker({ match }: IGetPositionJobseeker) {
    const newMatch = match;
    const jobseeker: string = newMatch?.jobseeker;
    delete newMatch?.jobseeker;
    const document = await this.quizzScoreLogModel
      .aggregate([
        {
          $match: newMatch,
        },
        {
          $group: {
            _id: '$jobseeker',
            totalScore: {
              $sum: {
                $toInt: '$score',
              },
            },
          },
        },
        {
          $sort: {
            totalScore: -1,
          },
        },
      ])
      .exec();
    const position: number =
      document.findIndex((doc) => doc._id === jobseeker) + 1;
    return position;
  }
}
