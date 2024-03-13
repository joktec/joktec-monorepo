import { Cacheable, CacheEvict, CachePut, CacheTtlSeconds } from '@joktec/cacher';
import { BaseController, Controller, DEFAULT_CON_ID, IControllerProps } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../base';
import { Category } from '../../models/entities';
import { CategoryService } from './category.service';
import { CategoryDto } from './models';

const expiry = CacheTtlSeconds.ONE_MINUTE;
const props: IControllerProps<Category> = {
  dto: Category,
  customDto: { createDto: CategoryDto },
  guards: [AuthGuard, RoleGuard],
  useBearer: true,
  paginate: {
    decorators: [Cacheable(Category.name, { expiry, conId: DEFAULT_CON_ID })],
  },
  detail: {
    decorators: [Cacheable(Category.name, { expiry, conId: DEFAULT_CON_ID })],
  },
  update: {
    decorators: [CachePut(Category.name, { expiry, conId: DEFAULT_CON_ID })],
  },
  delete: {
    decorators: [CacheEvict(Category.name, { allEntries: true, conId: DEFAULT_CON_ID })],
  },
};

@Controller('categories')
export class CategoryController extends BaseController<Category, string>(props) {
  constructor(protected categoryService: CategoryService) {
    super(categoryService);
  }
}
