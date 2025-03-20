import { Injectable } from '@joktec/core';
import { IMongoPipeline, IMongoRequest, MongoRepo, MongoService, ObjectId } from '@joktec/mongo';
import { plainToInstance, toInt } from '@joktec/utils';
import { Comment } from '../../models/schemas';

@Injectable()
export class CommentRepo extends MongoRepo<Comment, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Comment);
  }

  async myComments(query: IMongoRequest<Comment>, userId: string): Promise<{ items: Comment[]; total: number }> {
    const aggregations: IMongoPipeline[] = [
      { $match: { ...query.condition, authorId: ObjectId.create(userId), deletedAt: { $eq: null } } },
      { $lookup: { from: 'articles', localField: 'articleId', foreignField: '_id', as: 'article' } },
      { $unwind: '$article' },
      { $match: { 'article.deletedAt': { $eq: null } } },
      { $lookup: { from: 'users', localField: 'authorId', foreignField: '_id', as: 'author' } },
      { $unwind: '$author' },
      {
        $facet: {
          totalCount: [{ $count: 'count' }],
          data: [
            { $sort: { createdAt: -1 } },
            { $skip: query.offset },
            { $limit: query.limit },
            {
              $project: {
                comment: query.select || '$$ROOT',
                article: '$article',
                author: { _id: 1, avatar: 1, email: 1, nickname: 1, profile: 1 },
              },
            },
            { $replaceRoot: { newRoot: { $mergeObjects: ['$comment', { article: '$article', author: '$author' }] } } },
          ],
        },
      },
      { $project: { items: '$data', total: { $arrayElemAt: ['$totalCount.count', 0] } } },
    ];

    const version = await this.mongoService.getVersion();
    const result = await this.model.aggregate(aggregations, { version }).exec();
    const { items = [], total = 0 } = result[0];
    return { items: plainToInstance(Comment, items as any[]), total: toInt(total) };
  }
}
