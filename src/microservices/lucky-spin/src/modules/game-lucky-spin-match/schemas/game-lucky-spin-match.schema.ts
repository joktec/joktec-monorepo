import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type GameLuckySpinMatchDocument = GameLuckySpinMatch &
  CustomMongooseDocument;

@Schema({ collection: 'game_lucky_spin_match' })
export class GameLuckySpinMatch {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  jobseekerId: string;

  @Prop()
  luckySpinId: number;

  @Prop()
  sqlId: string;
}

export const GameLuckySpinMatchSchema =
  SchemaFactory.createForClass(GameLuckySpinMatch);
