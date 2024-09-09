import { ApiSchema, BaseListResponse, PickType } from '@joktec/core';
import { Article, User } from '../../../models/schemas';

@ApiSchema({ name: `ArticlePagination` })
export class ArticlePaginationDto extends BaseListResponse<Article>(Article) {}

export class UserLiked extends PickType(User, ['_id', 'avatar', 'email', 'nickname'] as const) {}

@ApiSchema({ name: `UserLikedPagination` })
export class UserLikedPaginationDto extends BaseListResponse<UserLiked>(UserLiked) {}
