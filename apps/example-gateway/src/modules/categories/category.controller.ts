import { CacheStrategy, CacheTtlSeconds } from '@joktec/cacher';
import { BaseController, Controller, DEFAULT_CON_ID, HttpResponse, HttpStatus, IControllerProps } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../base';
import { Category } from '../../models/entities';
import { CategoryService } from './category.service';
import { CategoryDto } from './models';

const props: IControllerProps<Category> = {
  dto: Category,
  customDto: { createDto: CategoryDto },
  bearer: AuthGuard,
  guards: RoleGuard,
  caching: CacheStrategy(Category.name, {
    enable: false,
    expiry: CacheTtlSeconds.ONE_MINUTE,
    allEntries: true,
    conId: DEFAULT_CON_ID,
  }),
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
