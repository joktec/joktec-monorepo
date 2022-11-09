import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { COLLECTION_NAME } from '../marketing-keyword.constants';

export type MarketingKeywordDocument = MarketingKeyword & CustomMongooseDocument;

@Schema({ collection: COLLECTION_NAME })
export class MarketingKeyword {
  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  })
  code: String;
  @Prop({
    type: String,
    required: true,
  })
  name: String;
  @Prop()
  nameEng: String;
  @Prop()
  link: String;
  @Prop()
  keywordType: String;
  @Prop({
    type: Number,
    default: 0,
  })
  priority: Number;
}

export const MarketingKeywordSchema = SchemaFactory.createForClass(MarketingKeyword);
