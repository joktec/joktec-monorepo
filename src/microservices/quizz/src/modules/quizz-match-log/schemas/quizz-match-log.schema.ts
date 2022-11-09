import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type QuizzMatchLogDocument = QuizzMatchLog & CustomMongooseDocument;

@Schema({ collection: 'quiz_match_log' })
export class QuizzMatchLog {
  @Prop({ type: String, default: () => uuid() })
  _id: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop({ default: 0 })
  score: number;

  @Prop()
  status: string;

  @Prop({ default: 0 })
  finishedPercent: number;

  @Prop()
  finishedAt!: Date;

  @Prop()
  jobseeker: string;

  @Prop()
  jobseekerId: string;

  @Prop()
  quiz: string;

  @Prop()
  quizId: number;

  @Prop({ default: 0 })
  isTimeOut: number;

  @Prop()
  questionOrder: Array<string>;

  @Prop()
  replayMatch: string;

  @Prop()
  replayMatchId: number;

  @Prop()
  sqlId: string;
}

export const QuizzMatchLogSchema = SchemaFactory.createForClass(QuizzMatchLog);
