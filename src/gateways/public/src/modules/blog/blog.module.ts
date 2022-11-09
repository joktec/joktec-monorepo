import { BlogMicroserviceConfig } from '@jobhopin/core';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { BlogContentResolver } from './resolvers/blog-content.resolver';
import { BlogNotificationLogResolver } from './resolvers/blog-notification-log.resolver';
import { BlogPostDigestResolver } from './resolvers/blog-post-digest.resolver';
import { BlogPostFavoriteResolver } from './resolvers/blog-post-favorite.resolver';
import { BlogPostResolver } from './resolvers/blog-post.resolver';

const blogMicroserviceConfig = new BlogMicroserviceConfig();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: blogMicroserviceConfig.name,
        ...blogMicroserviceConfig.microserviceOptions,
      },
    ]),
  ],
  providers: [
    BlogContentResolver,
    BlogNotificationLogResolver,
    BlogPostDigestResolver,
    BlogPostFavoriteResolver,
    BlogPostResolver,
  ],
  controllers: [],
})
export class BlogModule {}
