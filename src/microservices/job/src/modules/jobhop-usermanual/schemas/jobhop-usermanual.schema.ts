import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopUserManualDocument = JobhopUserManual &
  CustomMongooseDocument;

@Schema({ collection: 'jobhop_usermanual' })
export class JobhopUserManual {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  manualEn: string;

  @Prop()
  manualVi: string;

  @Prop()
  url: string;
}

export const JobhopUserManualSchema =
  SchemaFactory.createForClass(JobhopUserManual);
