import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type InterviewReviewDocument = InterviewReview & CustomMongooseDocument;

@Schema({ collection: 'interview_review' })
export class InterviewReview {
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
  jobTitle: string;
  @Prop()
  overallExperience: string;
  @Prop()
  offerStatus: string;
  @Prop()
  interviewDate: Date;
  @Prop()
  isAnonymous: number;
  @Prop()
  isSentNotification: number;
  @Prop()
  tipToShare: string;
  @Prop()
  rejectReason: string;
  @Prop()
  jobseekerId: string;
  @Prop()
  organizationId: string;
  @Prop()
  prevStatus: string;
  @Prop()
  status: string;
}

export const InterviewReviewSchema =
  SchemaFactory.createForClass(InterviewReview);
