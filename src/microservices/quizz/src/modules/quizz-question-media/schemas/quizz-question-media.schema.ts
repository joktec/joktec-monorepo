import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type QuizzQuestionMediaDocument = QuizzQuestionMedia &
  CustomMongooseDocument;

@Schema({ collection: 'quiz_question_media' })
export class QuizzQuestionMedia {
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
  image: string;

  @Prop()
  video: string;

  @Prop()
  mediaType: string;

  @Prop()
  question: string;

  @Prop()
  questionId: number;

  @Prop()
  sqlId: string;
}

export const QuizzQuestionMediaSchema =
  SchemaFactory.createForClass(QuizzQuestionMedia);
