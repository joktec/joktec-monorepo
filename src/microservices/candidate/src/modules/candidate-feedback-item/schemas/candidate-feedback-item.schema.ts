import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CandidateFeedbackItemDocument = CandidateFeedbackItem  & CustomMongooseDocument;

@Schema({ collection: 'candidate_feedback_item' })
export class CandidateFeedbackItem {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  level: number;
  @Prop()
  name: string;
  @Prop()
  inputType: string;
  @Prop()
  groupId: number;
  @Prop()
  parentId: number;
}

export const CandidateFeedbackItemSchema = SchemaFactory.createForClass(
  CandidateFeedbackItem,
);
