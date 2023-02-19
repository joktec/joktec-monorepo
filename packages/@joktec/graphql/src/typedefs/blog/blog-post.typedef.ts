import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class BlogPost extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  countFavorites: string;
}

@ObjectType()
export class BlogPostDetail extends BlogPost {}

@ObjectType()
export class BlogPostListReponse extends BaseListResponse({
  viewDto: BlogPost,
}) {}
