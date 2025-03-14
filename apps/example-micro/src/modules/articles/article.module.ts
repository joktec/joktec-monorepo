import { Module } from '@joktec/core';
import { ArticleController } from './article.controller';
import { ArticleCronner } from './article.cronner';
import { ArticleHandler } from './article.handler';
import { ArticleService } from './article.service';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, ArticleCronner, ArticleHandler],
  exports: [ArticleService, ArticleCronner],
})
export class ArticleModule {}
