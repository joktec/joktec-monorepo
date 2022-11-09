import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type GameUserSessionDocument = GameUserSession & CustomMongooseDocument;

@Schema({ collection: 'game_user_session' })
export class GameUserSession {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  userId: string;

  @Prop()
  deviceId: string;

  @Prop()
  sqlId: string;
}

export const GameUserSessionSchema =
  SchemaFactory.createForClass(GameUserSession);
