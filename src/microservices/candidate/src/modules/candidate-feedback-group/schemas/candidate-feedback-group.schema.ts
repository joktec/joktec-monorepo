import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CandidateFeedbackGroupDocument = CandidateFeedbackGroup  & CustomMongooseDocument;

@Schema({ collection: 'candidate_feedback_group' })
export class CandidateFeedbackGroup {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  name: string;
}

export const CandidateFeedbackGroupSchema = SchemaFactory.createForClass(
  CandidateFeedbackGroup,
);
