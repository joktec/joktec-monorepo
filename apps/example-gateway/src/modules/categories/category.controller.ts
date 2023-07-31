import { BaseController, Controller, RESPONSE_MESSAGE_KEY } from '@joktec/core';
import { CategoryService } from './category.service';
import { Category, CategoryDto } from './models';

@Controller('categories')
export class CategoryController extends BaseController<Category, string>({
  dto: Category,
  customDto: { createDto: CategoryDto },
  useBearer: false,
  metadata: {
    findAll: [{ key: RESPONSE_MESSAGE_KEY, value: 'QUERY_CATEGORY_SUCCESS' }],
    create: [{ key: RESPONSE_MESSAGE_KEY, value: 'CREATE_CATEGORY_SUCCESS' }],
  },
}) {
  constructor(protected categoryService: CategoryService) {
    super(categoryService);
  }
}
