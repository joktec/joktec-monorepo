import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type BlogPostFavoriteDocument = BlogPostFavorite &
  CustomMongooseDocument;

@Schema({ collection: 'blog_post_favorite' })
export class BlogPostFavorite {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  postId: number;

  @Prop()
  userId: string;

  @Prop()
  favorite: number;
}

export const BlogPostFavoriteSchema =
  SchemaFactory.createForClass(BlogPostFavorite);
