import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type QuizzQuestionAnswerDocument = QuizzQuestionAnswer &
  CustomMongooseDocument;

@Schema({ collection: 'quiz_question_answer' })
export class QuizzQuestionAnswer {
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
  answer: string;

  @Prop()
  answerVi: string;

  @Prop()
  isCorrectAnswer: number;

  @Prop()
  question: string;

  @Prop()
  questionId: number;

  @Prop()
  sqlId: string;
}

export const QuizzQuestionAnswerSchema =
  SchemaFactory.createForClass(QuizzQuestionAnswer);
