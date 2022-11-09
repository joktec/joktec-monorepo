import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type QuizzDocument = Quizz & CustomMongooseDocument;

@Schema({ collection: 'quiz' })
export class Quizz {
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
  name: string;

  @Prop()
  nameVi: string;

  @Prop()
  description: string;

  @Prop()
  descriptionVi: string;

  @Prop()
  numberOfVisitor: number;

  @Prop()
  numberOfPlayer: number;

  @Prop()
  numberOfVote: number;

  @Prop()
  upvotePercent: number;

  @Prop()
  logo: string;

  @Prop()
  banner: string;

  @Prop()
  category: string;

  @Prop()
  organization: string;

  @Prop()
  level: string;

  @Prop()
  isActive: number;

  @Prop()
  duration: number;

  @Prop()
  type: string;

  @Prop()
  tags: string;

  @Prop()
  numberOfQuestions: number;

  @Prop()
  whitelist: string;

  @Prop()
  mode: string;

  @Prop()
  isFreeToPlay: number;

  @Prop()
  hideResults: number;

  @Prop()
  eventTag: string;

  @Prop()
  language: string;

  @Prop()
  sqlId: string;
}

export const QuizzSchema = SchemaFactory.createForClass(Quizz);
