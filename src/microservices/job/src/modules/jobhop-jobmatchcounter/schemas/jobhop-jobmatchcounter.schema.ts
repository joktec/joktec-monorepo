import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopJobMatchCounterDocument = JobhopJobMatchCounter &
  CustomMongooseDocument;

@Schema({ collection: 'jobhop_jobmatchcounter' })
export class JobhopJobMatchCounter {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  recuiterCount: number;

  @Prop()
  candidateCount: number;

  @Prop()
  created: Date;

  @Prop()
  update: Date;
}

export const JobhopJobMatchCounterSchema = SchemaFactory.createForClass(
  JobhopJobMatchCounter,
);
