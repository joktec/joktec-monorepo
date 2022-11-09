import { BlogPostMessagePattern, BlogMicroserviceConfig } from '@jobhopin/core';
import {
  BaseResolver,
  BlogPost,
  BlogPostListReponse,
  BlogPostQueryInput,
  CreateBlogPostInput,
  UpdateBlogPostInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const blogMicroserviceConfig = new BlogMicroserviceConfig();

@Resolver(() => BlogPost)
export class BlogPostResolver extends BaseResolver<
  CreateBlogPostInput,
  UpdateBlogPostInput,
  BlogPostQueryInput
>({
  viewDto: BlogPost,
  createInput: CreateBlogPostInput,
  updateInput: UpdateBlogPostInput,
  listQueryInput: BlogPostQueryInput,
  listViewDto: BlogPostListReponse,
  name: 'blogPost',
  pluralName: 'blogPosts',
}) {
  constructor(
    @Inject(blogMicroserviceConfig.name)
    private readonly blogMicroservice: ClientProxy,
  ) {
    super(blogMicroservice, BlogPostMessagePattern);
  }
}
