import { BaseController, Controller, ResponseMessage } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../base';
import { CategoryService } from './category.service';
import { CategoryInterceptor } from './hooks';
import { Category, CategoryDto } from './models';

@Controller('categories')
export class CategoryController extends BaseController<Category, string>({
  dto: Category,
  customDto: { createDto: CategoryDto },
  useBearer: false,
  metric: false,
  guards: {
    findAll: [AuthGuard, RoleGuard],
  },
  hooks: {
    findAll: [CategoryInterceptor],
    findOne: [CategoryInterceptor],
  },
  decorators: {
    findAll: [ResponseMessage('QUERY_CATEGORY_SUCCESS')],
    create: [ResponseMessage('CREATE_CATEGORY_SUCCESS')],
  },
}) {
  constructor(protected categoryService: CategoryService) {
    super(categoryService);
  }
}
