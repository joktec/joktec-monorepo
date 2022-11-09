import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type InterviewReviewCommentMentionDocument =
  InterviewReviewCommentMention & CustomMongooseDocument;

@Schema({ collection: 'interview_review_comment_mention' })
export class InterviewReviewCommentMention {
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
  location: number;
  @Prop()
  interviewReviewCommentId: number;
  @Prop()
  jobseekerId: string;
}

export const InterviewReviewCommentMentionSchema = SchemaFactory.createForClass(
  InterviewReviewCommentMention,
);
