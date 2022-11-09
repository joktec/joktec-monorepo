import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type RecruiterLastActivityDateDocument = RecruiterLastActivityDate &
  CustomMongooseDocument;

@Schema({ collection: 'recruiter_last_activity_date' })
export class RecruiterLastActivityDate {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  username: string;

  @Prop()
  createdDate: Date;

  @Prop()
  messageType: string;

  @Prop()
  device: string;

  @Prop()
  referer: string;

  @Prop()
  servletPath: string;

  @Prop()
  status: string;

  @Prop()
  statusCode: number;
}

export const RecruiterLastActivityDateSchema = SchemaFactory.createForClass(
  RecruiterLastActivityDate,
);
