import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CandidateFeedbackGroupContentDocument =
  CandidateFeedbackGroupContent & CustomMongooseDocument;

@Schema({ collection: 'candidate_feedback_group_content' })
export class CandidateFeedbackGroupContent {
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
  candidatefeedbackgroupId: number;
  @Prop()
  candidatefeedbackgroup: string;
}

export const CandidateFeedbackGroupContentSchema = SchemaFactory.createForClass(
  CandidateFeedbackGroupContent,
);
