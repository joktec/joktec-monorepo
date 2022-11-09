import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobFavoriteDocument = JobFavorite  & CustomMongooseDocument;

@Schema({ collection: 'job_favorite' })
export class JobFavorite {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  favourite: number;

  @Prop()
  jobId: string;

  @Prop()
  lastUpdate: Date;

  @Prop()
  username: string;
}

export const JobFavoriteSchema = SchemaFactory.createForClass(JobFavorite);
