import { ApiSchema, PagePaginationResponse } from '@joktec/core';
import { Comment } from '../../../models/schemas';

@ApiSchema({ name: `CommentPagination` })
export class CommentPaginationDto extends PagePaginationResponse<Comment>(Comment) {}
