import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type InterviewReviewQuestionAnswerDocument =
  InterviewReviewQuestionAnswer & CustomMongooseDocument;

@Schema({ collection: 'interview_review_question_answer' })
export class InterviewReviewQuestionAnswer {
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
  answer: string;
  @Prop()
  username: string;
  @Prop()
  jobseekerId: string;
  @Prop()
  questionId: number;
}

export const InterviewReviewQuestionAnswerSchema = SchemaFactory.createForClass(
  InterviewReviewQuestionAnswer,
);
