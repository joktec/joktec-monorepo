import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobMatchPageTestimonialContentDocument =
  JobMatchPageTestimonialContent & CustomMongooseDocument;

@Schema({ collection: 'jobmatch_page_testimonialcontent' })
export class JobMatchPageTestimonialContent {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  lang: string;

  @Prop()
  jobTitle: string;

  @Prop()
  content: string;

  @Prop()
  testimonialId: number;
}

export const JobMatchPageTestimonialContentSchema =
  SchemaFactory.createForClass(JobMatchPageTestimonialContent);
