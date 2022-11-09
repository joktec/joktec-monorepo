import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type GameLuckySpinDocument = GameLuckySpin & CustomMongooseDocument;

@Schema({ collection: 'game_lucky_spin' })
export class GameLuckySpin {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop()
  name: string;

  @Prop()
  showBannerFrom: Date;

  @Prop()
  showBannerTo: Date;

  @Prop()
  startAt: Date;

  @Prop()
  endAt: Date;

  @Prop()
  addAdditionalTurn: number;

  @Prop()
  isActive: number;

  @Prop()
  amountOfPieces: number;

  @Prop()
  maximumTurnPerUser: number;

  @Prop()
  runOfTurnMessage: string;

  @Prop()
  whitelistToWin: string;

  @Prop()
  sqlId: string;
}

export const GameLuckySpinSchema = SchemaFactory.createForClass(GameLuckySpin);
