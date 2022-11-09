import {
  BlogPostDigestMessagePattern,
  BlogMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
  BlogPostDigest,
  BlogPostDigestListReponse,
  BlogPostDigestQueryInput,
  CreateBlogPostDigestInput,
  UpdateBlogPostDigestInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const blogMicroserviceConfig = new BlogMicroserviceConfig();

@Resolver(() => BlogPostDigest)
export class BlogPostDigestResolver extends BaseResolver<
  CreateBlogPostDigestInput,
  UpdateBlogPostDigestInput,
  BlogPostDigestQueryInput
>({
  viewDto: BlogPostDigest,
  createInput: CreateBlogPostDigestInput,
  updateInput: UpdateBlogPostDigestInput,
  listQueryInput: BlogPostDigestQueryInput,
  listViewDto: BlogPostDigestListReponse,
  name: 'blogPostDigest',
  pluralName: 'blogPostDigestes',
}) {
  constructor(
    @Inject(blogMicroserviceConfig.name)
    private readonly blogMicroservice: ClientProxy,
  ) {
    super(blogMicroservice, BlogPostDigestMessagePattern);
  }
}
