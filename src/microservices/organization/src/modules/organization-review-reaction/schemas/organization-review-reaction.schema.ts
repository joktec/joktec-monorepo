import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type OrganizationReviewReactionDocument = OrganizationReviewReaction &
  CustomMongooseDocument;

@Schema({ collection: 'organization_review_reaction' })
export class OrganizationReviewReaction {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  reactionReviewId: string;
  @Prop()
  jobseekerId: string;
  @Prop()
  organizationId: string;
  @Prop()
  reactionType: string;
  @Prop()
  createdDate: Date;
  @Prop()
  updatedDate: Date;
  @Prop()
  reviewId: string;
}

export const OrganizationReviewReactionSchema = SchemaFactory.createForClass(
  OrganizationReviewReaction,
);
