import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';

export type HighlightCompanyDocument = HighlightCompany &
  CustomMongooseDocument;

@Schema({ collection: 'highlight_company' })
export class HighlightCompany {
  @Prop({
    type: Number,
  })
  position: number;

  @Prop({
    type: String,
  })
  organizationId: string;

  @Prop({
    type: String,
  })
  createdBy: string;

  @Prop({
    type: String,
  })
  updatedBy: string;

  @Prop({
    type: Date,
  })
  createdAt: Date;
}

export const HighlightCompanySchema =
  SchemaFactory.createForClass(HighlightCompany);
