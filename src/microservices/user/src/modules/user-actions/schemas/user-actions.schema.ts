import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import {
  UserAction as UserActionModel,
  UserActionType,
  UserActionStatus,
} from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type UserActionDocument = UserActionModel & CustomMongooseDocument;

@Schema({ collection: 'user_action' })
export class UserAction {
  @Prop({ default: uuid() })
  _id: string;
  @Prop({
    type: String,
    required: true,
  })
  username: String;
  @Prop()
  platform: String;
  @Prop({
    type: String,
    default: UserActionType,
  })
  actionType: String;
  @Prop({
    type: String,
    default: UserActionStatus,
  })
  actionStatus: String;
}

export const UserActionSchema = SchemaFactory.createForClass(UserAction);
