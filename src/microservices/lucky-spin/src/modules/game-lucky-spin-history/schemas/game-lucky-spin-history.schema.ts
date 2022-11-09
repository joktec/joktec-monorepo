import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type GameLuckySpinHistoryDocument = GameLuckySpinHistory &
  CustomMongooseDocument;

@Schema({ collection: 'game_lucky_spin_history' })
export class GameLuckySpinHistory {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  amount: number;

  @Prop()
  itemMetaData: string;

  @Prop()
  luckySpinItemId: number;

  @Prop()
  luckySpinMatchId: number;

  @Prop()
  sqlId: string;
}

export const GameLuckySpinHistorySchema =
  SchemaFactory.createForClass(GameLuckySpinHistory);
