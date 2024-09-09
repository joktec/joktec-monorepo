import { ApiSchema, BaseListResponse } from '@joktec/core';
import { Comment } from '../../../models/schemas';

@ApiSchema({ name: `CommentPagination` })
export class CommentPaginationDto extends BaseListResponse<Comment>(Comment) {}
