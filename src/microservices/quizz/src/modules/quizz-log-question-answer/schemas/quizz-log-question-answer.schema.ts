import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type QuizzLogQuestionAnswerDocument = QuizzLogQuestionAnswer &
  CustomMongooseDocument;

@Schema({ collection: 'quiz_log_question_answered' })
export class QuizzLogQuestionAnswer {
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
  answers: string[];

  @Prop()
  correctAnswers: string[];

  @Prop()
  isCorrect: number;

  @Prop()
  score: number;

  @Prop()
  question: string;

  @Prop()
  quizMatch: string;

  @Prop({ default: 0 })
  usedHint: number;

  @Prop()
  metaData: string;

  @Prop()
  sqlId: string;
}

export const QuizzLogQuestionAnswerSchema = SchemaFactory.createForClass(
  QuizzLogQuestionAnswer,
);
