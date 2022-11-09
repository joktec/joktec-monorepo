import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobGroupDocument = JobGroup & CustomMongooseDocument;

@Schema({ collection: 'jobgroup' })
export class JobGroup {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  name: string;

  @Prop()
  organizationId: string;
}

export const JobGroupSchema = SchemaFactory.createForClass(JobGroup);
