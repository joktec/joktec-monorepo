import { Module, TransportProxyFactory } from '@joktec/core';
import { TRANSPORT } from '../../app.constant';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, TransportProxyFactory(TRANSPORT.PROXY.ARTICLE, TRANSPORT.NAME.REDIS)],
  exports: [CommentService],
})
export class CommentModule {}
