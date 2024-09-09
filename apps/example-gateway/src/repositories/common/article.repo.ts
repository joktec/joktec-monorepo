import { IListResponseDto, Injectable, plainToInstance, toInt } from '@joktec/core';
import { IMongoPipeline, IMongoRequest, MongoHelper, MongoRepo, MongoService, ObjectId } from '@joktec/mongo';
import { EmotionType } from '../../models/constants';
import { Article, User } from '../../models/schemas';

@Injectable()
export class ArticleRepo extends MongoRepo<Article, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Article);
  }

  async homeFeed(query: IMongoRequest<Article>, loggedUser: User): Promise<IListResponseDto<Article>> {
    const authorId = ObjectId.create(loggedUser._id);
    const $project = [...query.select].reduce((curr, acc) => {
      curr[acc] = 1;
      return curr;
    }, {});

    const pipeline: IMongoPipeline[] = [
      { $match: MongoHelper.parseFilter({ ...query.condition }) },
      {
        $lookup: {
          from: 'emotions',
          localField: '_id',
          foreignField: 'targetId',
          as: 'emotions',
          pipeline: [
            { $match: { authorId, target: Article.name, type: EmotionType.VIEW } },
            { $group: { _id: '$targetId', views: { $sum: 1 } } },
          ],
        },
      },
      { $addFields: { myTotalView: { $ifNull: [{ $first: '$emotions.views' }, 0] } } },
      {
        $facet: {
          total: [{ $count: 'count' }],
          items: [
            { $sort: { myTotalView: 1, postedAt: -1 } },
            { $skip: query.offset },
            { $limit: query.limit },
            {
              $lookup: {
                from: 'users',
                localField: 'authorId',
                foreignField: '_id',
                as: 'author',
                pipeline: [{ $project: { _id: 1, avatar: 1, email: 1, nickname: 1 } }],
              },
            },
            { $unwind: '$author' },
            {
              $lookup: {
                from: 'emotions',
                localField: '_id',
                foreignField: 'targetId',
                as: 'emotions',
                pipeline: [{ $match: { authorId, deletedAt: null, target: Article.name, type: EmotionType.LIKE } }],
              },
            },
            { $addFields: { isLiked: { $gt: [{ $size: '$emotions' }, 0] } } },
            { $project: { ...$project, isLiked: 1, author: 1 } },
          ],
        },
      },
      { $project: { items: '$items', total: { $arrayElemAt: ['$total.count', 0] } } },
    ];

    if (query.keyword) {
      pipeline.unshift({ $match: { $text: { $search: query.keyword } } });
    }

    const version = await this.mongoService.getVersion();
    const result = await this.model.aggregate(pipeline, { version }).exec();
    const { items = [], total = 0 } = result[0];
    return { items: plainToInstance(Article, items as any[]), total: toInt(total) };
  }
}
