import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CvFeedbackDocument = CvFeedback  & CustomMongooseDocument;

@Schema({ collection: 'cv_feedback' })
export class CvFeedback {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  createdDate: Date;

  @Prop()
  lastupdate: Date;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop()
  cvFeedbackId: string;

  @Prop()
  actor: string;

  @Prop()
  cvId: string;

  @Prop()
  description: string;

  @Prop()
  title: string;
  
}

export const CvFeedbackSchema = SchemaFactory.createForClass(CvFeedback);
