import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type QuizzScoreLogDocument = QuizzScoreLog & CustomMongooseDocument;

@Schema({ collection: 'quiz_score_log' })
export class QuizzScoreLog {
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
  scoreType: string;

  @Prop()
  jobseeker: string;

  @Prop()
  jobseekerId: string;

  @Prop()
  quizMatch: string;

  @Prop()
  quizMatchId: number;

  @Prop()
  sqlId: string;
}

export const QuizzScoreLogSchema = SchemaFactory.createForClass(QuizzScoreLog);
