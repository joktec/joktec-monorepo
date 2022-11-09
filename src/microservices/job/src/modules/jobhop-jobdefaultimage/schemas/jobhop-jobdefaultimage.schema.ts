import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopJobDefaultImageDocument = JobhopJobDefaultImage &
  CustomMongooseDocument;

@Schema({ collection: 'jobhop_jobdefaultimage' })
export class JobhopJobDefaultImage {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  image: string;
}

export const JobhopJobDefaultImageSchema = SchemaFactory.createForClass(
  JobhopJobDefaultImage,
);
