import { BaseService, Injectable, JwtPayload } from '@joktec/core';
import { CategoryRepo } from './category.repo';
import { Category, CategoryDto } from './models';

@Injectable()
export class CategoryService extends BaseService<Category, string> {
  constructor(protected categoryRepo: CategoryRepo) {
    super(categoryRepo);
  }

  async create(entity: CategoryDto, payload?: JwtPayload): Promise<Category> {
    this.logService.info('CategoryDto: %j', entity);
    return super.create(entity, payload);
  }
}
