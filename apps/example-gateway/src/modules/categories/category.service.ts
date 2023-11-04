import { BaseService, Injectable } from '@joktec/core';
import { CategoryRepo } from './category.repo';
import { Category } from './models';

@Injectable()
export class CategoryService extends BaseService<Category, string> {
  constructor(protected categoryRepo: CategoryRepo) {
    super(categoryRepo);
  }
}
