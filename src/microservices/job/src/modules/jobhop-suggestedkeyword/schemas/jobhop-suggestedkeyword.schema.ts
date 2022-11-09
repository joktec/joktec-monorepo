import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopSuggestedKeywordDocument = JobhopSuggestedKeyword &
  CustomMongooseDocument;

@Schema({ collection: 'jobhop_suggestedkeyword' })
export class JobhopSuggestedKeyword {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  keyword: string;

  @Prop()
  score: number;

  @Prop()
  created: Date;

  @Prop()
  update: Date;

  @Prop()
  jobId: string;
}

export const JobhopSuggestedKeywordSchema = SchemaFactory.createForClass(
  JobhopSuggestedKeyword,
);
