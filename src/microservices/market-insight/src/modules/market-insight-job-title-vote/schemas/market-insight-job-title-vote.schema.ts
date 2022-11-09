import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type MarketInsightJobTitleVoteDocument = MarketInsightJobTitleVote &
  CustomMongooseDocument;

@Schema({ collection: 'market_insight_job_title_vote' })
export class MarketInsightJobTitleVote {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  jobTitle: string;

  @Prop()
  function: string;

  @Prop()
  identityId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  feedback: string;

  @Prop()
  vote: number;
}

export const MarketInsightJobTitleVoteSchema = SchemaFactory.createForClass(
  MarketInsightJobTitleVote,
);
