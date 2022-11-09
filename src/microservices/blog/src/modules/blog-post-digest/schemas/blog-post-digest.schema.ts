import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type BlogPostDigestDocument = BlogPostDigest & CustomMongooseDocument;

@Schema({ collection: 'blog_post_digest' })
export class BlogPostDigest {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  postId: number;

  @Prop()
  createDate: Date;
}

export const BlogPostDigestSchema =
  SchemaFactory.createForClass(BlogPostDigest);
