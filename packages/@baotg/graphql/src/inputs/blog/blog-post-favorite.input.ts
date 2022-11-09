import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseBlogPostFavoriteInput {
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

@InputType()
export class CreateBlogPostFavoriteInput extends BaseBlogPostFavoriteInput {}

@InputType()
export class UpdateBlogPostFavoriteInput extends BaseBlogPostFavoriteInput {
  @Field()
  id!: string;
}

@InputType()
export class BlogPostFavoritePaginationInput extends BasePaginationInput {}

@InputType()
export class BlogPostFavoriteConditionInput extends BaseConditionInput {}

@InputType()
export class BlogPostFavoriteQueryInput extends BaseQueryInput({
  conditionInput: BlogPostFavoriteConditionInput,
  paginationInput: BlogPostFavoritePaginationInput,
})<BlogPostFavoriteConditionInput, BlogPostFavoritePaginationInput> {}
