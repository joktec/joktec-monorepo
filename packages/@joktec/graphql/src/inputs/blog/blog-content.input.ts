import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseBlogContentInput {
  @Field(() => String, {
    nullable: true,
  })
  contentId: string;

  @Field(() => String, {
    nullable: true,
  })
  title: string;

  @Field(() => String, {
    nullable: true,
  })
  link: string;

  @Field(() => String, {
    nullable: true,
  })
  company: string;

  @Field(() => String, {
    nullable: true,
  })
  urlImage: string;
}

@InputType()
export class CreateBlogContentInput extends BaseBlogContentInput {}

@InputType()
export class UpdateBlogContentInput extends BaseBlogContentInput {
  @Field()
  id!: string;
}

@InputType()
export class BlogContentPaginationInput extends BasePaginationInput {}

@InputType()
export class BlogContentConditionInput extends BaseConditionInput {}

@InputType()
export class BlogContentQueryInput extends BaseQueryInput({
  conditionInput: BlogContentConditionInput,
  paginationInput: BlogContentPaginationInput,
})<BlogContentConditionInput, BlogContentPaginationInput> {}
