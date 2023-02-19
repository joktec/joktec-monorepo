import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseBlogPostInput {
  @Field(() => String, {
    nullable: true,
  })
  countFavorites: string;
}

@InputType()
export class CreateBlogPostInput extends BaseBlogPostInput {}

@InputType()
export class UpdateBlogPostInput extends BaseBlogPostInput {
  @Field()
  id!: string;
}

@InputType()
export class BlogPostPaginationInput extends BasePaginationInput {}

@InputType()
export class BlogPostConditionInput extends BaseConditionInput {}

@InputType()
export class BlogPostQueryInput extends BaseQueryInput({
  conditionInput: BlogPostConditionInput,
  paginationInput: BlogPostPaginationInput,
})<BlogPostConditionInput, BlogPostPaginationInput> {}
