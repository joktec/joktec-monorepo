import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type OrganizationReviewDocument = OrganizationReview  & CustomMongooseDocument;

@Schema({ collection: 'organization_review' })
export class OrganizationReview {
  @Prop({ default: uuid() })
  _id: string;
  reviewId: string;
  @Prop()
  isAnonymous: number;
  @Prop()
  isCurrentEmployee: number;
  @Prop()
  jobTitle: string;
  @Prop()
  department: string;
  @Prop()
  jobType: string;
  @Prop()
  overallRating: number;
  @Prop()
  willRefer: number;
  @Prop()
  reviewTitle: string;
  @Prop()
  advantages: string;
  @Prop()
  disadvantages: string;
  @Prop()
  jobseekerId: string;
  @Prop()
  createdDate: Date;
  @Prop()
  updatedDate: Date;
  @Prop()
  expYears: number;
  @Prop()
  organizationId: string;
  @Prop()
  isClickable: number;
  @Prop()
  isIncognitoMode: number;
  @Prop()
  username: string;
  @Prop()
  year: string;
  @Prop()
  approval: string;
  @Prop()
  sentNotification: number;
  @Prop()
  unapprovedReason: string;
}

export const OrganizationReviewSchema =
  SchemaFactory.createForClass(OrganizationReview);
