import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type MarketingSeoKeywordDocument = MarketingSeoKeyword &
  CustomMongooseDocument;

@Schema({ collection: 'marketing_seo_keyword' })
export class MarketingSeoKeyword {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  keyword: string;

  @Prop()
  templateName: string;
}

export const MarketingSeoKeywordSchema =
  SchemaFactory.createForClass(MarketingSeoKeyword);
