import { BlogPostFavoriteMessagePattern, BlogMicroserviceConfig } from '@jobhopin/core';
import {
  BaseResolver,
  BlogPostFavorite,
  BlogPostFavoriteListReponse,
  BlogPostFavoriteQueryInput,
  CreateBlogPostFavoriteInput,
  UpdateBlogPostFavoriteInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const blogMicroserviceConfig = new BlogMicroserviceConfig();

@Resolver(() => BlogPostFavorite)
export class BlogPostFavoriteResolver extends BaseResolver<
  CreateBlogPostFavoriteInput,
  UpdateBlogPostFavoriteInput,
  BlogPostFavoriteQueryInput
>({
  viewDto: BlogPostFavorite,
  createInput: CreateBlogPostFavoriteInput,
  updateInput: UpdateBlogPostFavoriteInput,
  listQueryInput: BlogPostFavoriteQueryInput,
  listViewDto: BlogPostFavoriteListReponse,
  name: 'blogPostFavorite',
  pluralName: 'blogPostFavorites',
}) {
  constructor(
    @Inject(blogMicroserviceConfig.name)
    private readonly blogMicroservice: ClientProxy,
  ) {
    super(blogMicroservice, BlogPostFavoriteMessagePattern);
  }
}
