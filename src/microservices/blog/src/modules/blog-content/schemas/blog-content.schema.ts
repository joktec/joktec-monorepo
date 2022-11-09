import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type BlogContentDocument = BlogContent & CustomMongooseDocument;

@Schema({ collection: 'blog_content' })
export class BlogContent {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  contentId: string;

  @Prop()
  title: string;

  @Prop()
  link: string;

  @Prop()
  createBy: string;

  @Prop()
  createDate: Date;

  @Prop()
  updateBy: string;

  @Prop()
  updateDate: Date;

  @Prop()
  company: string;

  @Prop()
  urlImage: string;
}

export const BlogContentSchema = SchemaFactory.createForClass(BlogContent);
