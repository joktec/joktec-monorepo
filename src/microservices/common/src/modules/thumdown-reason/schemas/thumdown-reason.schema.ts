import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { NAME } from '../thumdown-reason.constants';

export type ThumdownReasonDocument = ThumdownReason & CustomMongooseDocument;

@Schema({ collection: NAME })
export class ThumdownReason {
  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  })
  code: string;
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop()
  nameEn: string;

  @Prop({
    type: Number,
  })
  deleted: number;

  @Prop({
    type: Number,
  })
  isActive: number;

  @Prop({
    type: String,
  })
  updateBy: string;

  @Prop({
    type: String,
  })
  createdBy: string;

  @Prop({
    type: Date,
  })
  createdAt: Date;

  @Prop({
    type: Date,
  })
  updatedAt: Date;
}

export const ThumdownReasonSchema =
  SchemaFactory.createForClass(ThumdownReason);
