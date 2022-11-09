import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type BlogPostDocument = BlogPost & CustomMongooseDocument;

@Schema({ collection: 'blog_post' })
export class BlogPost {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  countFavorites: string;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);
