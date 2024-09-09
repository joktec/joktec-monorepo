import {
  ApiOkResponse,
  ApiOperation,
  BaseController,
  Controller,
  Get,
  IControllerProps,
  QueryParam,
} from '@joktec/core';
import { IMongoRequest } from '@joktec/mongo';
import { AuthGuard, RoleGuard } from '../../common';
import { Comment } from '../../models/schemas';
import { CommentService } from './comment.service';
import { CommentCreateDto, CommentPaginationDto, CommentUpdateDto } from './models';

const props: IControllerProps<Comment> = {
  dto: Comment,
  customDto: { createDto: CommentCreateDto, updatedDto: CommentUpdateDto },
  guards: [AuthGuard, RoleGuard],
  useBearer: true,
};

@Controller('comments')
export class CommentController extends BaseController<Comment, string>(props) {
  constructor(protected commentService: CommentService) {
    super(commentService);
  }

  @Get('/my')
  @ApiOperation({ summary: `My list comments` })
  @ApiOkResponse({ type: CommentPaginationDto })
  async myComments(@QueryParam() query: IMongoRequest<Comment>): Promise<CommentPaginationDto> {
    return this.commentService.myComments(query);
  }
}
