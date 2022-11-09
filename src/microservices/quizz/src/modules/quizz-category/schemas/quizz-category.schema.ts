import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type QuizzCategoryDocument = QuizzCategory & CustomMongooseDocument;

@Schema({ collection: 'quiz_category' })
export class QuizzCategory {
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
  name: string;

  @Prop()
  nameVi: string;

  @Prop()
  isActive: number;

  @Prop()
  sqlId: string;
}

export const QuizzCategorySchema = SchemaFactory.createForClass(QuizzCategory);
