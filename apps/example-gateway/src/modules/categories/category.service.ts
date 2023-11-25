import { BaseService, IBaseRequest, IListResponseDto, Injectable, sleep } from '@joktec/core';
import { CategoryRepo } from './category.repo';
import { Category } from './models';

@Injectable()
export class CategoryService extends BaseService<Category, string> {
  constructor(protected categoryRepo: CategoryRepo) {
    super(categoryRepo);
  }

  async paginate(query: IBaseRequest<Category>): Promise<IListResponseDto<Category>> {
    await sleep(5000);
    return super.paginate(query);
  }
}
