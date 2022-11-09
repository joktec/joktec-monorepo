import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';

export type KeywordDocument = Keyword & CustomMongooseDocument;

@Schema({ collection: 'keyword' })
export class Keyword {
  @Prop({
    type: String,
  })
  code: string;

  @Prop({
    type: String,
  })
  content: string;

  @Prop({
    type: Number,
  })
  score: number;

  @Prop({
    type: String,
  })
  industryId: string;

  @Prop({
    type: String,
  })
  publicId: string;

  @Prop({
    type: String,
  })
  type: string;

  @Prop({
    type: Number,
  })
  isActive: number;

  @Prop({
    type: String,
  })
  contentEng: string;

  @Prop({
    type: String,
  })
  customUrl: string;

  @Prop({
    type: String,
  })
  sqlId: string;
}

export const KeywordSchema = SchemaFactory.createForClass(Keyword);
