import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { UserPlatform as UserPlatformModel } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type UserPlatformDocument = UserPlatformModel & CustomMongooseDocument;

@Schema({ collection: 'users_platform' })
export class UserPlatform {
  @Prop({ default: uuid() })
  _id: string;
  @Prop({
    type: String,
    ref: 'users',
  })
  user: String;
  @Prop({
    type: Number,
    default: 0,
  })
  platform: Number;

  // * Migration fields
  @Prop()
  userId: String;
  @Prop()
  platformId: String;
}

export const UserPlatformSchema = SchemaFactory.createForClass(UserPlatform);
