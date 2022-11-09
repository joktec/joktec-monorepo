import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type GameTurnLogDocument = GameTurnLog & CustomMongooseDocument;

@Schema({ collection: 'game_turn_log' })
export class GameTurnLog {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  turn: number;

  @Prop()
  isRead: number;

  @Prop()
  isVisible: number;

  @Prop()
  isClaimed: number;

  @Prop()
  action: string;

  @Prop()
  jobseekerId: string;

  @Prop()
  quizMatchId: number;

  @Prop()
  metaData: string;

  @Prop()
  sqlId: string;
}

export const GameTurnLogSchema = SchemaFactory.createForClass(GameTurnLog);
