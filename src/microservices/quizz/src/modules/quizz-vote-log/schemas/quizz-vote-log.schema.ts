import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type QuizzVoteLogDocument = QuizzVoteLog & CustomMongooseDocument;

@Schema({ collection: 'quiz_vote_log' })
export class QuizzVoteLog {
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
  voteStatus: string;

  @Prop()
  jobseeker: string;

  @Prop()
  jobseekerId: string;

  @Prop()
  quiz: string;

  @Prop()
  quizId: number;

  @Prop()
  reason: string;

  @Prop()
  sqlId: string;
}

export const QuizzVoteLogSchema = SchemaFactory.createForClass(QuizzVoteLog);
