import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type MarketingKeywordDocument = MarketingKeyword &
  CustomMongooseDocument;

@Schema({ collection: 'marketing_keyword' })
export class MarketingKeyword {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  name: string;

  @Prop()
  nameEng: string;

  @Prop()
  link: string;

  @Prop()
  keywordType: string;

  @Prop()
  priority: number;
}

export const MarketingKeywordSchema =
  SchemaFactory.createForClass(MarketingKeyword);
