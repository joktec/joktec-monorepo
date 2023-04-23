import { BaseController, Controller } from '@joktec/core';
import { CategoryService } from './category.service';
import { Category } from '../../models';

@Controller('categories')
export class CategoryController extends BaseController<Category, string>({ dto: Category, useGuard: false }) {
  constructor(protected categoryService: CategoryService) {
    super(categoryService);
  }
}
