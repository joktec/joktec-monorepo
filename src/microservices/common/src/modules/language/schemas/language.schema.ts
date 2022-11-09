import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';

export type LanguageDocument = Language & CustomMongooseDocument;

@Schema({ collection: 'language' })
export class Language {
  @Prop({
    type: String,
  })
  code: string;

  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: String,
  })
  nameEng: string;

  @Prop({
    type: String,
  })
  lang: string;

  @Prop({
    type: Number,
  })
  priority: number;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
