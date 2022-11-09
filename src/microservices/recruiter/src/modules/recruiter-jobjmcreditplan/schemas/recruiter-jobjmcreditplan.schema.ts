import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type RecruiterJobjmcreditplanDocument = RecruiterJobjmcreditplan &
  CustomMongooseDocument;

@Schema({ collection: 'recruiter_jobjmcreditplan' })
export class RecruiterJobjmcreditplan {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  weeklyProcessedCv: number;

  @Prop()
  dailyImporession: string;
}

export const RecruiterJobjmcreditplanSchema = SchemaFactory.createForClass(
  RecruiterJobjmcreditplan,
);
