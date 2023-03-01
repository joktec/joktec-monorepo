import { ApiTags, BaseController, Controller } from '@joktec/core';
import { CategoryService } from './category.service';
import { Category } from '../../models';

@ApiTags('categories')
@Controller('categories')
export class CategoryController extends BaseController<Category, string> {
  constructor(protected categoryService: CategoryService) {
    super(categoryService);
  }
}
