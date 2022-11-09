import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import {
  UserSetting as UserSettingModel,
  UserSettingNotificationType,
} from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type UserSettingDocument = UserSettingModel & CustomMongooseDocument;

@Schema({ collection: 'user_setting' })
export class UserSetting {
  @Prop({ default: uuid() })
  _id: string;
  @Prop({
    type: String,
    default: 'en',
  })
  language: String;
  @Prop({
    type: String,
    enum: UserSettingNotificationType,
  })
  receivedNotiApp: String;
  @Prop({
    type: Number,
    default: 0,
  })
  askThumbdownJob: Number;
  @Prop({
    type: Number,
    default: 0,
  })
  locationPermission: Number;
  @Prop({
    type: String,
    ref: 'users',
  })
  user: String;
  // * @TODO:
  @Prop()
  location: String;

  // * Migration fields
  @Prop()
  userId: String;
  @Prop()
  locationId: String;
}

export const UserSettingSchema = SchemaFactory.createForClass(UserSetting);
