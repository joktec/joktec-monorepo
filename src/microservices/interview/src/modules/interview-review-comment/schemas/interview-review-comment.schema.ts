import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type InterviewReviewCommentDocument = InterviewReviewComment &
  CustomMongooseDocument;

@Schema({ collection: 'interview_review_comment' })
export class InterviewReviewComment {
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
  username: string;
  @Prop()
  comment: string;
  @Prop()
  interviewReviewId: number;
  @Prop()
  jobseekerId: string;
  @Prop()
  parentId: number;
}

export const InterviewReviewCommentSchema = SchemaFactory.createForClass(
  InterviewReviewComment,
);
