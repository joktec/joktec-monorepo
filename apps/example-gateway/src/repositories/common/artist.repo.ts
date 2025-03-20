import { Injectable, IPaginationResponse } from '@joktec/core';
import { IMongoPipeline, IMongoRequest, MongoHelper, MongoRepo, MongoService, ObjectId } from '@joktec/mongo';
import { plainToInstance, toInt } from '@joktec/utils';
import { ArticleStatus } from '../../models/constants';
import { Artist } from '../../models/schemas';

@Injectable()
export class ArtistRepo extends MongoRepo<Artist, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Artist);
  }

  async paginateSelected(query: IMongoRequest<Artist>, artistIds: string[]): Promise<IPaginationResponse<Artist>> {
    const pipeline: IMongoPipeline[] = [
      { $match: { ...query.condition, deletedAt: null, status: ArticleStatus.ACTIVATED } },
      {
        $addFields: {
          isSelected: {
            $cond: {
              if: { $in: ['$_id', artistIds.map(artistId => ObjectId.create(artistId))] },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $facet: {
          total: [{ $count: 'count' }],
          items: [
            { $project: { matchedUser: 0 } },
            { $sort: { isSelected: -1, createdAt: 1, ...MongoHelper.parseSort(query.sort) } },
            { $skip: query.offset },
            { $limit: query.limit },
            ...(query.select ? [{ $project: MongoHelper.parseProjection(query.select) }] : []),
          ],
        },
      },
      { $project: { items: '$items', total: { $arrayElemAt: ['$total.count', 0] } } },
    ];

    if (query.keyword) {
      // pipeline.unshift({ $match: { $text: { $search: query.keyword } } });
      pipeline.unshift({ $match: { hiddenText: { $regex: query.keyword, $options: 'i' } } });
    }

    const version = await this.mongoService.getVersion();
    const result = await this.model.aggregate(pipeline, { version }).exec();
    const { items = [], total = 0 } = result[0];
    return { items: plainToInstance(Artist, items as any[]), total: toInt(total) };
  }
}
