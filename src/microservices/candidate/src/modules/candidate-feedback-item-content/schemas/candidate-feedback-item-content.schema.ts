import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CandidateFeedbackItemContentDocument =
  CandidateFeedbackItemContent & CustomMongooseDocument;

@Schema({ collection: 'candidate_feedback_item_content' })
export class CandidateFeedbackItemContent {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  lang: string;
  @Prop()
  title: string;
  @Prop({ type: Object })
  items: object;
  @Prop()
  candidatefeedbackitemId: number;
  @Prop()
  candidatefeedbackitem: string;
}

export const CandidateFeedbackItemContentSchema = SchemaFactory.createForClass(
  CandidateFeedbackItemContent,
);
