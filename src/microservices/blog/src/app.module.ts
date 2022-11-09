import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from './app.service';
import { BlogContentModule } from './modules/blog-content/blog-content.module';
import { BlogNotificationLogModule } from './modules/blog-notification-log/blog-notification-log.module';
import { BlogPostModule } from './modules/blog-post/blog-post.module';
import { BlogPostDigestModule } from './modules/blog-post-digest/blog-post-digest.module';
import { BlogPostFavoriteModule } from './modules/blog-post-favorite/blog-post-favorite.module';
import { HealthModule } from '@jobhopin/core';

@Module({
  imports: [
    CacheModule.register(),
    MongooseModule.forRoot(process.env.BLOG_SERVICE_MONGODB_URL),
    HealthModule,
    BlogContentModule,
    BlogNotificationLogModule,
    BlogPostModule,
    BlogPostDigestModule,
    BlogPostFavoriteModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
