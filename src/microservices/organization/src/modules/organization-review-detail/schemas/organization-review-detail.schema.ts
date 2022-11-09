import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type OrganizationReviewDetailDocument = OrganizationReviewDetail  & CustomMongooseDocument;

@Schema({ collection: 'organization_review_detail' })
export class OrganizationReviewDetail {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  rating: number;
  @Prop()
  questionId: number;
  @Prop()
  reviewId: string;
  @Prop()
  createdDate: Date;
  @Prop()
  updatedDate: Date;
  @Prop()
  categoryId: number;
}

export const OrganizationReviewDetailSchema = SchemaFactory.createForClass(
  OrganizationReviewDetail,
);
