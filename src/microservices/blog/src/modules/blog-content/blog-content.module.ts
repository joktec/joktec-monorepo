import { BlogContent, BlogContentSchema } from './schemas/blog-content.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BlogContentService } from './blog-content.service';
import { BlogContentController } from './blog-content.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogContent.name, schema: BlogContentSchema },
    ]),
  ],
  controllers: [BlogContentController],
  providers: [BlogContentService],
})
export class BlogContentModule {}
