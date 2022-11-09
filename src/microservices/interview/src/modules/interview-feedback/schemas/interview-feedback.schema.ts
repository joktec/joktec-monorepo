import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type InterviewFeedbackDocument = InterviewFeedback &
  CustomMongooseDocument;

@Schema({ collection: 'interview_feedback' })
export class InterviewFeedback {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  candidateId: string;
  @Prop()
  interviewId: string;
  @Prop()
  rating: number;
  @Prop()
  comment: string;
  @Prop()
  createdAt: Date;
}

export const InterviewFeedbackSchema =
  SchemaFactory.createForClass(InterviewFeedback);
