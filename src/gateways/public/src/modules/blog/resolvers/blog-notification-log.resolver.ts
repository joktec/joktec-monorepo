import {
  BlogNotificationLogMessagePattern,
  BlogMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
  BlogNotificationLog,
  BlogNotificationLogListReponse,
  BlogNotificationLogQueryInput,
  CreateBlogNotificationLogInput,
  UpdateBlogNotificationLogInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const blogMicroserviceConfig = new BlogMicroserviceConfig();

@Resolver(() => BlogNotificationLog)
export class BlogNotificationLogResolver extends BaseResolver<
  CreateBlogNotificationLogInput,
  UpdateBlogNotificationLogInput,
  BlogNotificationLogQueryInput
>({
  viewDto: BlogNotificationLog,
  createInput: CreateBlogNotificationLogInput,
  updateInput: UpdateBlogNotificationLogInput,
  listQueryInput: BlogNotificationLogQueryInput,
  listViewDto: BlogNotificationLogListReponse,
  name: 'blogNotificationLog',
  pluralName: 'blogNotificationLogs',
}) {
  constructor(
    @Inject(blogMicroserviceConfig.name)
    private readonly blogMicroservice: ClientProxy,
  ) {
    super(blogMicroservice, BlogNotificationLogMessagePattern);
  }
}
