import { BaseController, Controller, IControllerProps, ResponseMessage } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../base';
import { CategoryService } from './category.service';
import { Category, CategoryDto } from './models';

const props: IControllerProps<Category> = {
  dto: Category,
  customDto: { createDto: CategoryDto },
  bearer: AuthGuard,
  guards: RoleGuard,
  decorators: {
    findAll: [ResponseMessage('QUERY_CATEGORY_SUCCESS')],
    create: [ResponseMessage('CREATE_CATEGORY_SUCCESS')],
  },
};

@Controller('categories')
export class CategoryController extends BaseController<Category, string>(props) {
  constructor(protected categoryService: CategoryService) {
    super(categoryService);
  }
}
