import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type QuizzLanguageDocument = QuizzLanguage & CustomMongooseDocument;

@Schema({ collection: 'quiz_language' })
export class QuizzLanguage {
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
  logo: string;

  @Prop()
  sqlId: string;
}

export const QuizzLanguageSchema = SchemaFactory.createForClass(QuizzLanguage);
