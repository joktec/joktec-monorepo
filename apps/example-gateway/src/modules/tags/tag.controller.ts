import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  BaseController,
  BaseValidationPipe,
  Body,
  Controller,
  Delete,
  Get,
  IControllerProps,
  Jwt,
  JwtPayload,
  UsePipes,
} from '@joktec/core';
import { AuthGuard, RoleGuard, SuccessResponse } from '../../common';
import { Tag } from '../../models/schemas';
import { ClearKeywordDto } from './models';
import { LatestKeywordResponseDto } from './models/tag-response.dto';
import { TagService } from './tag.service';

const props: IControllerProps<Tag> = {
  dto: Tag,
  guards: [AuthGuard, RoleGuard],
  useBearer: true,
  create: { disable: true },
  update: { disable: true },
  delete: { disable: true },
};

@Controller('tags')
export class TagController extends BaseController<Tag, string>(props) {
  constructor(protected tagService: TagService) {
    super(tagService);
  }

  @Get('/recently')
  @ApiOperation({ summary: `My recently keywords` })
  @ApiOkResponse({ type: LatestKeywordResponseDto })
  async recentlyKeywords(@Jwt() payload: JwtPayload): Promise<LatestKeywordResponseDto> {
    return this.tagService.recentlyKeywords(payload);
  }

  @Delete('/recently')
  @ApiOperation({ summary: `Hide recently keywords` })
  @ApiBody({ type: ClearKeywordDto })
  @ApiOkResponse({ type: SuccessResponse })
  @UsePipes(new BaseValidationPipe())
  async clearKeywords(@Body() body: ClearKeywordDto, @Jwt() payload: JwtPayload): Promise<SuccessResponse> {
    return this.tagService.clearKeywords(body, payload);
  }
}
