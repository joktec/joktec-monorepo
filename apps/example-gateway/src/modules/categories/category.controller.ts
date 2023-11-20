import { BaseController, Controller, HttpResponse, HttpStatus, IControllerProps } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../base';
import { CategoryService } from './category.service';
import { Category, CategoryDto } from './models';

const props: IControllerProps<Category> = {
  dto: Category,
  customDto: { createDto: CategoryDto },
  bearer: AuthGuard,
  guards: RoleGuard,
  decorators: {
    paginate: [HttpResponse(HttpStatus.OK, 'QUERY_CATEGORY_SUCCESS')],
    create: [HttpResponse(HttpStatus.OK, 'CREATE_CATEGORY_SUCCESS')],
  },
};

@Controller('categories')
export class CategoryController extends BaseController<Category, string>(props) {
  constructor(protected categoryService: CategoryService) {
    super(categoryService);
  }
}
