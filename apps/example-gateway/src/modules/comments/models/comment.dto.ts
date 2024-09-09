import { PickType } from '@joktec/core';
import { Comment } from '../../../models/schemas';

export class CommentCreateDto extends PickType(Comment, ['content', 'articleId', 'parentId'] as const) {
  authorId?: string;
}

export class CommentUpdateDto extends PickType(CommentCreateDto, ['content'] as const) {}
