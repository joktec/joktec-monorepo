import { Module, TransportProxyFactory } from '@joktec/core';
import { TRANSPORT } from '../../app.constant';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [],
  controllers: [ArticleController],
  providers: [
    ArticleService,
    TransportProxyFactory(TRANSPORT.PROXY.ARTICLE, TRANSPORT.NAME.REDIS),
    TransportProxyFactory(TRANSPORT.PROXY.USER, TRANSPORT.NAME.REDIS),
  ],
  exports: [ArticleService],
})
export class ArticleModule {}
