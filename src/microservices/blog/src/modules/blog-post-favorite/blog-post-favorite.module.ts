import {
  BlogPostFavorite,
  BlogPostFavoriteSchema,
} from './schemas/blog-post-favorite.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BlogPostFavoriteService } from './blog-post-favorite.service';
import { BlogPostFavoriteController } from './blog-post-favorite.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogPostFavorite.name, schema: BlogPostFavoriteSchema },
    ]),
  ],
  controllers: [BlogPostFavoriteController],
  providers: [BlogPostFavoriteService],
})
export class BlogPostFavoriteModule {}
