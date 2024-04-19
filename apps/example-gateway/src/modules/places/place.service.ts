import { BaseService, IListResponseDto, Injectable } from '@joktec/core';
import { get } from 'lodash';
import { PlaceSchema } from '../../models/schemas';
import { PlaceRepo } from '../../repositories';
import { PlaceQuery } from './models';

const LIMIT = 100;

@Injectable()
export class PlaceService extends BaseService<PlaceSchema, string, PlaceQuery> {
  constructor(protected placeRepo: PlaceRepo) {
    super(placeRepo);
  }

  async paginate(query: PlaceQuery): Promise<IListResponseDto<PlaceSchema>> {
    // this.logService.info(query, 'Query');
    return super.paginate(query);
  }

  async migrateOffset() {
    console.time('migrateOffset');
    let page: number = 1;
    const total = await this.placeRepo.count({ condition: {} });
    const totalPage = Math.ceil(total / LIMIT);
    do {
      const { items: places } = await this.placeRepo.paginate({
        condition: {},
        sort: { socialId: 'asc' },
        limit: LIMIT,
        page,
      });
      await this.updatePlace(places);
      this.logService.info('Handle next page %s', page);
      page++;
    } while (page <= totalPage);
    console.timeEnd('migrateOffset');
  }

  async migrateCursor() {
    console.time('migrateCursor');
    let cursor: string = '*';
    do {
      const { items: places, nextCursor } = await this.placeRepo.paginate({
        condition: {},
        sort: { socialId: 'asc' },
        limit: LIMIT,
        cursor,
      });
      await this.updatePlace(places);
      this.logService.info('Handle next cursor %s', nextCursor);
      cursor = nextCursor;
    } while (cursor !== null);
    console.timeEnd('migrateCursor');
  }

  private async updatePlace(places: PlaceSchema[]) {
    for (const place of places) {
      const reviewRating = get(place, 'jsonData.location.reviewSummary.rating', 0);
      const reviewCount = get(place, 'jsonData.location.reviewSummary.count', 0);
      await this.placeRepo.update({ _id: place._id }, { reviewRating, reviewCount });
    }
  }
}
