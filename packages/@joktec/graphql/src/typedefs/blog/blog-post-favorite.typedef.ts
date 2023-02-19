import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class BlogPostFavorite extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  postId: number;

  @Field(() => String, {
    nullable: true,
  })
  userId: string;

  @Field(() => Int, {
    nullable: true,
  })
  favorite: number;
}

@ObjectType()
export class BlogPostFavoriteDetail extends BlogPostFavorite {}

@ObjectType()
export class BlogPostFavoriteListReponse extends BaseListResponse({
  viewDto: BlogPostFavorite,
}) {}
