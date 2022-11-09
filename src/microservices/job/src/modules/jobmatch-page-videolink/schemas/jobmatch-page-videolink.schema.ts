import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobMatchPageVideolinkDocument = JobMatchPageVideolink &
  CustomMongooseDocument;

@Schema({ collection: 'jobmatch_page_videolink' })
export class JobMatchPageVideolink {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  link: string;

  @Prop()
  page: string;
}

export const JobMatchPageVideolinkSchema = SchemaFactory.createForClass(
  JobMatchPageVideolink,
);
