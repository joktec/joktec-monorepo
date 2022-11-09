import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type MarketValueInstructionFeedbackDocument =
  MarketValueInstructionFeedback & CustomMongooseDocument;

@Schema({ collection: 'market_value_instruction_feedback' })
export class MarketValueInstructionFeedback {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  createdBy: string;

  @Prop()
  isHelpful: number;

  @Prop()
  unhelpfulReason: string;

  @Prop()
  feedback: string;
}

export const MarketValueInstructionFeedbackSchema =
  SchemaFactory.createForClass(MarketValueInstructionFeedback);
