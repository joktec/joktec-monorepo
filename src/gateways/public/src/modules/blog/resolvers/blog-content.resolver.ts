import {
  BlogContentMessagePattern,
  BlogMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
  BlogContent,
  BlogContentListReponse,
  BlogContentQueryInput,
  CreateBlogContentInput,
  UpdateBlogContentInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const blogMicroserviceConfig = new BlogMicroserviceConfig();

@Resolver(() => BlogContent)
export class BlogContentResolver extends BaseResolver<
  CreateBlogContentInput,
  UpdateBlogContentInput,
  BlogContentQueryInput
>({
  viewDto: BlogContent,
  createInput: CreateBlogContentInput,
  updateInput: UpdateBlogContentInput,
  listQueryInput: BlogContentQueryInput,
  listViewDto: BlogContentListReponse,
  name: 'blogContent',
  pluralName: 'blogContentes',
}) {
  constructor(
    @Inject(blogMicroserviceConfig.name)
    private readonly blogMicroservice: ClientProxy,
  ) {
    super(blogMicroservice, BlogContentMessagePattern);
  }
}
