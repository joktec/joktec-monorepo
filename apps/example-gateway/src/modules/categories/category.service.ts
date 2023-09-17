import { BaseService, Injectable, JwtPayload, LogService } from '@joktec/core';
import { CategoryRepo } from './category.repo';
import { Category, CategoryDto } from './models';

@Injectable()
export class CategoryService extends BaseService<Category, string> {
  constructor(
    protected categoryRepo: CategoryRepo,
    private logger: LogService,
  ) {
    super(categoryRepo);
    this.logger.setContext(CategoryService.name);
  }

  async create(entity: CategoryDto, payload?: JwtPayload): Promise<Category> {
    this.logger.info('CategoryDto: %j', entity);
    return super.create(entity, payload);
  }
}
