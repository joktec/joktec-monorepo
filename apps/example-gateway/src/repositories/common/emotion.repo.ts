import { IPaginationResponse, Injectable, plainToInstance, toInt } from '@joktec/core';
import { IMongoPipeline, IMongoRequest, MongoHelper, MongoRepo, MongoService, ObjectId } from '@joktec/mongo';
import { EmotionStatus, EmotionType } from '../../models/constants';
import { Article, Emotion, User } from '../../models/schemas';

@Injectable()
export class EmotionRepo extends MongoRepo<Emotion, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Emotion);
  }

  async myLikeArticles(query: IMongoRequest<Article>, userId: string): Promise<IPaginationResponse<Article>> {
    const select = ['_id', 'title', 'description', 'createdAt', 'type', 'postedAt', 'summary', 'authorId'];
    const fileSelect = ['files._id', 'files.type', 'files.url', 'files.preview', 'files.ratio'];
    const authorSelect = ['author._id', 'author.avatar', 'author.email', 'author.nickname'];
    const $project = [...select, ...fileSelect, ...authorSelect].reduce((curr, acc) => {
      curr[acc] = 1;
      return curr;
    }, {});
    const aggregations: IMongoPipeline[] = [
      {
        $match: {
          authorId: ObjectId.create(userId),
          deletedAt: null,
          status: EmotionStatus.ACTIVATED,
          type: EmotionType.LIKE,
          target: Article.name,
        },
      },
      { $lookup: { from: 'articles', localField: 'targetId', foreignField: '_id', as: 'article' } },
      { $unwind: '$article' },
      { $match: MongoHelper.parseFilter({ article: { deletedAt: { $eq: null }, ...query.condition } }) },
      {
        $facet: {
          total: [{ $count: 'count' }],
          items: [
            { $sort: { createdAt: -1 } },
            { $skip: query.offset },
            { $limit: query.limit },
            { $replaceRoot: { newRoot: '$article' } },
            { $lookup: { from: 'users', localField: 'authorId', foreignField: '_id', as: 'author' } },
            { $unwind: '$author' },
            { $project },
          ],
        },
      },
      { $project: { items: '$items', total: { $arrayElemAt: ['$total.count', 0] } } },
    ];

    const version = await this.mongoService.getVersion();
    const result = await this.model.aggregate(aggregations, { version }).exec();
    const { items = [], total = 0 } = result[0];
    return { items: plainToInstance(Article, items as any[]), total: toInt(total) };
  }

  async getLikedUsers(
    query: IMongoRequest<User>,
    articleId: string,
    excludeUserIds: string[],
  ): Promise<IPaginationResponse<User>> {
    const aggregations: IMongoPipeline[] = [
      {
        $match: {
          targetId: ObjectId.create(articleId),
          authorId: { $nin: excludeUserIds.map(id => ObjectId.create(id)) },
          deletedAt: { $eq: null },
          status: EmotionStatus.ACTIVATED,
          type: EmotionType.LIKE,
          target: Article.name,
        },
      },
      { $lookup: { from: 'users', localField: 'authorId', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $match: MongoHelper.parseFilter({ user: { deletedAt: { $eq: null }, ...query.condition } }) },
      {
        $facet: {
          count: [{ $count: 'count' }],
          items: [
            { $sort: { createdAt: -1 } },
            { $skip: query.offset },
            { $limit: query.limit },
            { $replaceRoot: { newRoot: '$user' } },
            { $project: { _id: 1, avatar: 1, email: 1, nickname: 1 } },
          ],
        },
      },
      { $project: { items: '$items', total: { $arrayElemAt: ['$count.count', 0] } } },
    ];

    const version = await this.mongoService.getVersion();
    const result = await this.model.aggregate(aggregations, { version }).exec();
    const { items = [], total = 0 } = result[0];
    return { items: plainToInstance(User, items as any[]), total: toInt(total) };
  }
}
