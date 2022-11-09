import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type QuizzEventDocument = QuizzEvent & CustomMongooseDocument;

@Schema({ collection: 'quiz_event' })
export class QuizzEvent {
  @Prop({ type: String, default: () => uuid() })
  _id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop()
  name: string;

  @Prop()
  showBannerFrom: Date;

  @Prop()
  showBannerTo: Date;

  @Prop()
  startAt: Date;

  @Prop()
  endAt: Date;

  @Prop()
  banner: string;

  @Prop()
  quiz: string;

  @Prop()
  quizId: number;

  @Prop()
  leaderBoardResult: string;

  @Prop()
  eventType: string;

  @Prop()
  eventLink: string;

  @Prop()
  endEventLink: string;

  @Prop()
  sqlId: string;
}

export const QuizzEventSchema = SchemaFactory.createForClass(QuizzEvent);
