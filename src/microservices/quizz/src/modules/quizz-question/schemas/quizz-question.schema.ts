import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type QuizzQuestionDocument = QuizzQuestion & CustomMongooseDocument;

@Schema({ collection: 'quiz_question' })
export class QuizzQuestion {
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
  question: string;

  @Prop()
  questionVi: string;

  @Prop()
  hint: string;

  @Prop()
  hintVi: string;

  @Prop()
  explanation: string;

  @Prop()
  explanationVi: string;

  @Prop()
  score: number;

  @Prop()
  isMultiAnswer: number;

  @Prop()
  quiz: string;

  @Prop()
  quizId: number;

  @Prop()
  isFreetext: string;

  @Prop()
  isFreetextAnswer: string;

  @Prop()
  cloneFromId: string;

  @Prop()
  description: string;

  @Prop()
  sqlId: string;
}

export const QuizzQuestionSchema = SchemaFactory.createForClass(QuizzQuestion);
