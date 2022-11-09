import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { CustomMongooseDocument } from '@jobhopin/core';

export type FeedbackDocument = Feedback & CustomMongooseDocument;

@Schema({ collection: 'feedback' })
export class Feedback {
  @Prop({
    type: String,
  })
  actor: string;

  @Prop({
    type: String,
  })
  candidateId: string;

  @Prop({
    type: String,
  })
  createBy: string;

  @Prop({
    type: String,
  })
  createDate: string;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: String,
  })
  lastUpdate: string;

  @Prop({
    type: String,
  })
  rate: string;

  @Prop({
    type: String,
  })
  updateBy: string;

  @Prop({
    type: String,
  })
  title: string;

  @Prop({
    type: String,
  })
  feedbackType: string;

  @Prop({
    type: Number,
  })
  rating: number;

  @Prop({
    type: String,
  })
  deleted: string;

  @Prop({
    type: Number,
  })
  platform: number;

  @Prop({
    type: String,
  })
  feedbackAi: string;

  @Prop({
    type: [String],
  })
  feedbackData: string[];

  @Prop({
    type: String,
  })
  usersAreMentioned: string;

  @Prop({
    type: String,
  })
  createdAt: string;

  @Prop({
    type: String,
  })
  updatedAt: string;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
