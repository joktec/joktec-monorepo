import { BaseService, Injectable } from '@joktec/core';
import { Category } from '../../models/entities';
import { CategoryRepo } from '../../repositories';

@Injectable()
export class CategoryService extends BaseService<Category, string> {
  constructor(protected categoryRepo: CategoryRepo) {
    super(categoryRepo);
  }
}
