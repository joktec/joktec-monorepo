import {
  BlogPostDigest,
  BlogPostDigestSchema,
} from './schemas/blog-post-digest.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BlogPostDigestService } from './blog-post-digest.service';
import { BlogPostDigestController } from './blog-post-digest.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogPostDigest.name, schema: BlogPostDigestSchema },
    ]),
  ],
  controllers: [BlogPostDigestController],
  providers: [BlogPostDigestService],
})
export class BlogPostDigestModule {}
