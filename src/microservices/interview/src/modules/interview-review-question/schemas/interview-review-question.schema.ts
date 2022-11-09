import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type InterviewReviewQuestionDocument = InterviewReviewQuestion &
  CustomMongooseDocument;

@Schema({ collection: 'interview_review_question' })
export class InterviewReviewQuestion {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  isDeleted: number;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  question: string;
  @Prop()
  interviewReviewId: number;
}

export const InterviewReviewQuestionSchema = SchemaFactory.createForClass(
  InterviewReviewQuestion,
);
