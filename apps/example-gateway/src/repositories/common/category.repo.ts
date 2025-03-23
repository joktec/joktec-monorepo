import { Injectable } from '@joktec/core';
import { IMongoPipeline, MongoRepo, MongoService } from '@joktec/mongo';
import { plainToInstance } from '@joktec/utils';
import dayjs from 'dayjs';
import { PipelineStage } from 'mongoose';
import { ArticleStatus, ArticleType, ArtistStatus, CategoryStatus, EmotionType } from '../../models/constants';
import { Article, Category } from '../../models/schemas';
import { CategoryRankingDto, CategoryRankingRange, CategoryRankingResponse } from '../../modules/categories/models';

@Injectable()
export class CategoryRepo extends MongoRepo<Category, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Category);
  }

  async facetRanking(filter: CategoryRankingDto, timezone: string): Promise<CategoryRankingResponse[]> {
    // Build sub-pipeline to reuse
    const articleLookup: PipelineStage[] = [{ $addFields: { downloads: '$summary.download' } }];
    if (filter.type === CategoryRankingRange.MONTHLY) {
      articleLookup.shift();
      const today = dayjs().tz(timezone);
      const $match: PipelineStage.Match['$match'] = {
        target: Article.name,
        type: EmotionType.DOWNLOAD,
        createdAt: {
          $gte: today.clone().startOf('days').subtract(1, 'months').toDate(),
          $lte: today.clone().endOf('days').toDate(),
        },
      };
      const $lookup: PipelineStage.Lookup['$lookup'] = {
        from: 'emotions',
        localField: '_id',
        foreignField: 'targetId',
        as: 'emotions',
        pipeline: [{ $match }],
      };
      const $addFields: PipelineStage.AddFields['$addFields'] = { downloads: { $size: '$emotions' } };
      articleLookup.push({ $lookup }, { $addFields });
    }

    // Main category pipeline
    const categoryPipelines: IMongoPipeline[] = [
      { $match: { deletedAt: null, status: CategoryStatus.ACTIVATED } },
      {
        $lookup: {
          from: 'artists',
          localField: '_id',
          foreignField: 'categoryIds',
          as: 'artists',
          pipeline: [{ $match: { deletedAt: null, status: ArtistStatus.ACTIVATED } }],
        },
      },
      {
        $lookup: {
          from: 'articles',
          localField: 'artists._id',
          foreignField: 'artistIds',
          as: 'articles',
          pipeline: [
            { $match: { parentId: null, deletedAt: null, status: ArticleStatus.ACTIVATED, type: ArticleType.CARD } },
            ...(articleLookup as any),
          ],
        },
      },
      { $unwind: { path: '$articles', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$_id',
          category: { $first: '$$ROOT' },
          totalDownloads: { $sum: '$articles.downloads' },
          latestTime: { $max: '$articles.updatedAt' },
        },
      },
      {
        $addFields: {
          'category.totalDownloads': '$totalDownloads',
          'category.latestTime': '$latestTime',
          'category.target': 'Category',
        },
      },
      { $replaceRoot: { newRoot: '$category' } },
      { $project: { _id: 1, title: 1, type: 1, image: 1, status: 1, totalDownloads: 1, latestTime: 1, target: 1 } },
    ];

    // Merge solo article with category
    const soloArticlePipe: Exclude<PipelineStage, PipelineStage.Out | PipelineStage.Merge>[] = [
      { $match: { deletedAt: null, status: ArtistStatus.ACTIVATED, categoryIds: { $size: 0 } } },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'artistIds',
          as: 'articles',
          pipeline: [
            { $match: { parentId: null, deletedAt: null, status: ArticleStatus.ACTIVATED, type: ArticleType.CARD } },
            ...(articleLookup as any),
          ],
        },
      },
      { $unwind: { path: '$articles', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$_id',
          artist: { $first: '$$ROOT' },
          totalDownloads: { $sum: '$articles.downloads' },
          latestTime: { $max: '$articles.updatedAt' },
        },
      },
      {
        $addFields: {
          'artist.totalDownloads': '$totalDownloads',
          'artist.latestTime': '$latestTime',
          'artist.target': 'Artist',
        },
      },
      { $replaceRoot: { newRoot: '$artist' } },
      {
        $project: {
          _id: 1,
          title: '$name',
          type: 1,
          image: '$avatar',
          status: 1,
          totalDownloads: 1,
          latestTime: 1,
          target: 1,
        },
      },
    ];

    const res = await this.model
      .aggregate(categoryPipelines)
      .unionWith({ coll: 'artists', pipeline: soloArticlePipe })
      .sort({ totalDownloads: -1, latestTime: -1 })
      .limit(10)
      .exec();
    return plainToInstance(CategoryRankingResponse, res);
  }
}
