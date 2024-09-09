import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  BaseController,
  BaseValidationPipe,
  Body,
  Controller,
  IControllerProps,
  Post,
  UsePipes,
} from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../common';
import { Article, Block, User } from '../../models/schemas';
import { BlockService } from './block.service';
import { BlockCreateDto } from './models/block.dto';

const props: IControllerProps<Block> = {
  dto: Block,
  guards: [AuthGuard, RoleGuard],
  useBearer: true,
  create: { disable: true },
  update: { disable: true },
};

@Controller('blocks')
export class BlockController extends BaseController<Block, string>(props) {
  constructor(protected blockService: BlockService) {
    super(blockService);
  }

  @Post('/users')
  @ApiOperation({ summary: `Block user` })
  @ApiOkResponse({ type: Block })
  @ApiBody({ type: BlockCreateDto })
  @UsePipes(new BaseValidationPipe())
  async blockUser(@Body() entity: BlockCreateDto): Promise<Block> {
    return this.blockService.create({ ...entity, target: User.name });
  }

  @Post('/articles')
  @ApiOperation({ summary: `Block article` })
  @ApiOkResponse({ type: Block })
  @ApiBody({ type: BlockCreateDto })
  @UsePipes(new BaseValidationPipe())
  async blockArticle(@Body() entity: BlockCreateDto): Promise<Block> {
    return this.blockService.create({ ...entity, target: Article.name });
  }
}
