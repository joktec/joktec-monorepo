import { Module } from '@joktec/core';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
