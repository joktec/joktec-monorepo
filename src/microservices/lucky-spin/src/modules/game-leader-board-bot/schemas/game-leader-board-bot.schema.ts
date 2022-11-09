import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type GameLeaderBoardBotDocument = GameLeaderBoardBot &
  CustomMongooseDocument;

@Schema({ collection: 'game_leader_board_bot' })
export class GameLeaderBoardBot {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  username: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  avatar: string;

  @Prop()
  sqlId: string;
}

export const GameLeaderBoardBotSchema =
  SchemaFactory.createForClass(GameLeaderBoardBot);
