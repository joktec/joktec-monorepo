import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseBlogPostDigestInput {
  @Field(() => Int, {
    nullable: true,
  })
  postId: number;
}

@InputType()
export class CreateBlogPostDigestInput extends BaseBlogPostDigestInput {}

@InputType()
export class UpdateBlogPostDigestInput extends BaseBlogPostDigestInput {
  @Field()
  id!: string;
}

@InputType()
export class BlogPostDigestPaginationInput extends BasePaginationInput {}

@InputType()
export class BlogPostDigestConditionInput extends BaseConditionInput {}

@InputType()
export class BlogPostDigestQueryInput extends BaseQueryInput({
  conditionInput: BlogPostDigestConditionInput,
  paginationInput: BlogPostDigestPaginationInput,
})<BlogPostDigestConditionInput, BlogPostDigestPaginationInput> {}
