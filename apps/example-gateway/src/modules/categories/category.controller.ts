import {
  ApiOkResponse,
  ApiOperation,
  BaseController,
  Controller,
  Get,
  IControllerProps,
  QueryParam,
  Req,
} from '@joktec/core';
import { IRequest } from '../../app.constant';
import { AuthGuard, RoleGuard } from '../../common';
import { Category } from '../../models/schemas';
import { CategoryService } from './category.service';
import { CategoryRankingDto, CategoryRankingResponse } from './models';

const props: IControllerProps<Category> = {
  dto: Category,
  guards: [AuthGuard, RoleGuard],
  useBearer: true,
  create: { disable: true },
  update: { disable: true },
  delete: { disable: true },
};

@Controller('categories')
export class CategoryController extends BaseController<Category, string>(props) {
  constructor(protected categoryService: CategoryService) {
    super(categoryService);
  }

  @Get('/ranking')
  @ApiOperation({ summary: `Get category ranking` })
  @ApiOkResponse({ type: CategoryRankingResponse, isArray: true })
  async ranking(@QueryParam() filter: CategoryRankingDto, @Req() req: IRequest): Promise<CategoryRankingResponse[]> {
    return this.categoryService.ranking(filter, req.timezone);
  }
}
