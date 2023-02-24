import { BaseResponseInterceptor, BaseController, Controller, UseInterceptors } from '@joktec/core';
import { CategoryService } from './category.service';
import { Category } from '../../models';

@Controller('categories')
@UseInterceptors(BaseResponseInterceptor)
export class CategoryController extends BaseController<Category, string> {
  constructor(protected categoryService: CategoryService) {
    super(categoryService);
  }
}
