import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type GameScoreTurnLogDocument = GameScoreTurnLog &
  CustomMongooseDocument;

@Schema({ collection: 'game_score_turn_log' })
export class GameScoreTurnLog {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  remainingTurn: number;

  @Prop()
  totalScore: number;

  @Prop()
  jobseekerId: string;

  @Prop()
  userId: string;

  @Prop()
  sqlId: string;
}

export const GameScoreTurnLogSchema =
  SchemaFactory.createForClass(GameScoreTurnLog);
