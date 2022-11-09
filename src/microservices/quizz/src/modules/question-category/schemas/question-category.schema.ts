import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type QuestionCategoryDocument = QuestionCategory &
  CustomMongooseDocument;

@Schema({ collection: 'question_category' })
export class QuestionCategory {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  categoryId: string;

  @Prop()
  codeName: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  imageActiveMode: string;

  @Prop()
  imageDisableMode: string;

  @Prop()
  priority: number;

  @Prop()
  isActive: number;

  @Prop()
  createdDate: Date;

  @Prop()
  updatedDate: Date;

  @Prop()
  sqlId: string;
}

export const QuestionCategorySchema =
  SchemaFactory.createForClass(QuestionCategory);
