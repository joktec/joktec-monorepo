import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobMatchPageTestimonialDocument = JobMatchPageTestimonial &
  CustomMongooseDocument;

@Schema({ collection: 'jobmatch_page_testimonial' })
export class JobMatchPageTestimonial {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  avatar: string;

  @Prop()
  name: string;

  @Prop()
  page: string;
}

export const JobMatchPageTestimonialSchema = SchemaFactory.createForClass(
  JobMatchPageTestimonial,
);
