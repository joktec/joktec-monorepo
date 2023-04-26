import { BaseService, Injectable } from '@joktec/core';
import { Category } from './models';
import { CategoryRepo } from './category.repo';

@Injectable()
export class CategoryService extends BaseService<Category, string> {
  constructor(protected categoryRepo: CategoryRepo) {
    super(categoryRepo);
  }
}
