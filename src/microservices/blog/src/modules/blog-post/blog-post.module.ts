import { BlogPost, BlogPostSchema } from './schemas/blog-post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { BlogPostController } from './blog-post.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogPost.name, schema: BlogPostSchema },
    ]),
  ],
  controllers: [BlogPostController],
  providers: [BlogPostService],
})
export class BlogPostModule {}
