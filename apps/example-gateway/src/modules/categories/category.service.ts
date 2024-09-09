import { Cacheable, CacheTtlSeconds } from '@joktec/cacher';
import { BaseService, Inject, Injectable, REQUEST } from '@joktec/core';
import { IRequest } from '../../app.constant';
import { Category } from '../../models/schemas';
import { CategoryRepo } from '../../repositories';
import { CategoryRankingDto, CategoryRankingRange, CategoryRankingResponse } from './models';

@Injectable()
export class CategoryService extends BaseService<Category, string> {
  constructor(
    protected categoryRepo: CategoryRepo,
    @Inject(REQUEST) public request: IRequest,
  ) {
    super(categoryRepo);
  }

  @Cacheable('category:ranking', { expiry: CacheTtlSeconds.ONE_HOUR, transform: CategoryRankingResponse })
  async ranking(filter: CategoryRankingDto, timezone: string): Promise<CategoryRankingResponse[]> {
    if (!filter.type) filter.type = CategoryRankingRange.OVERALL;
    return this.categoryRepo.facetRanking(filter, timezone);
  }
}
