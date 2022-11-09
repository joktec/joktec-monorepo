import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type GameLuckySpinItemDocument = GameLuckySpinItem &
  CustomMongooseDocument;

@Schema({ collection: 'game_lucky_spin_item' })
export class GameLuckySpinItem {
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
  itemType: string;

  @Prop()
  quantity: number;

  @Prop()
  amount: number;

  @Prop()
  ratio: number;

  @Prop()
  itemDescription: string;

  @Prop()
  itemData: string;

  @Prop()
  itemImage: string;

  @Prop()
  luckySpinId: number;

  @Prop()
  numberOfPieces: number;

  @Prop()
  sqlId: string;
}

export const GameLuckySpinItemSchema =
  SchemaFactory.createForClass(GameLuckySpinItem);
