import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { COLLECTION_NAME } from '../marketing-seo-keyword.constants';

export type MarketingSeoKeywordDocument = MarketingSeoKeyword & CustomMongooseDocument;

@Schema({ collection: COLLECTION_NAME })
export class MarketingSeoKeyword {
  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  })
  keyword: String;
  @Prop({
    type: String,
    required: true,
  })
  templateName: String;
}

export const MarketingSeoKeywordSchema = SchemaFactory.createForClass(MarketingSeoKeyword);
