import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type GameAssessmentTestJobHistoryDocument =
  GameAssessmentTestJobHistory & CustomMongooseDocument;

@Schema({ collection: 'game_assessment_test_job_history' })
export class GameAssessmentTestJobHistory {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  username: string;

  @Prop()
  applyType: string;

  @Prop()
  status: string;

  @Prop()
  cvId: string;

  @Prop()
  jobId: string;

  @Prop()
  jobseekerId: string;

  @Prop()
  quizId: string;

  @Prop()
  platform: string;

  @Prop()
  referralId: string;

  @Prop()
  testingEmail: string;

  @Prop()
  sqlId: string;
}

export const GameAssessmentTestJobHistorySchema = SchemaFactory.createForClass(
  GameAssessmentTestJobHistory,
);
