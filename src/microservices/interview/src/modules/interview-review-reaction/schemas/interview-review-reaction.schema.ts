import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type InterviewReviewReactionDocument = InterviewReviewReaction &
  CustomMongooseDocument;

@Schema({ collection: 'interview_review_reaction' })
export class InterviewReviewReaction {
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
  reactionType: string;
  @Prop()
  type: string;
  @Prop()
  interviewReviewId: number;
  @Prop()
  interviewReviewCommentId: number;
  @Prop()
  jobseekerId: string;
}

export const InterviewReviewReactionSchema = SchemaFactory.createForClass(
  InterviewReviewReaction,
);
