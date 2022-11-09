import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type QuestionDocument = Question & CustomMongooseDocument;

@Schema({ collection: 'question' })
export class Question {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  questionId: string;

  @Prop()
  codeName: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  iconUrl: string;

  @Prop()
  categoryId: number;

  @Prop()
  priority: number;

  @Prop()
  isActive: number;

  @Prop()
  createdDate: Date;

  @Prop()
  updatedDate: Date;

  @Prop()
  isShowInsight: number;

  @Prop()
  descriptionInsight: string;

  @Prop()
  sqlId: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
