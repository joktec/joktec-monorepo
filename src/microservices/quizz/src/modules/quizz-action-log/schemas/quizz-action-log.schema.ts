import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type QuizzActionLogDocument = QuizzActionLog & CustomMongooseDocument;

@Schema({ collection: 'quiz_action_log' })
export class QuizzActionLog {
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

  @Prop()
  action: string;

  @Prop()
  jobseeker: string;

  @Prop()
  jobseekerId: string;

  @Prop()
  quiz: string;

  @Prop()
  quizId: number;

  @Prop({ default: 0 })
  isClaimedCheckin: number;

  @Prop()
  sqlId: string;
}

export const QuizzActionLogSchema =
  SchemaFactory.createForClass(QuizzActionLog);
