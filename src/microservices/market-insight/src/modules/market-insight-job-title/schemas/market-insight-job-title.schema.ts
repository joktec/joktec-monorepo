import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type MarketInsightJobTitleDocument = MarketInsightJobTitle &
  CustomMongooseDocument;

@Schema({ collection: 'market_insight_job_title' })
export class MarketInsightJobTitle {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  jobTitle: string;

  @Prop()
  function: string;

  @Prop()
  isTop: number;

  @Prop()
  createdAt: Date;

  @Prop()
  trendingFunctionPriority: number;

  @Prop()
  isTrendingFunction: number;

  @Prop()
  trendingFunctionName: string;

  @Prop()
  trendingFunctionIcon: string;

  @Prop()
  jobTitleVi: string;

  @Prop()
  trendingFunctionNameVi: string;

  @Prop()
  averageSalary: number;
}

export const MarketInsightJobTitleSchema = SchemaFactory.createForClass(
  MarketInsightJobTitle,
);
