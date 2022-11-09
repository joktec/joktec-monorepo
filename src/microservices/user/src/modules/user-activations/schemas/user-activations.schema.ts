import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { UserActivation as UserActivationModel } from '@jobhopin/core';
import { Schema as SchemaType } from 'mongoose';
import { uuid } from 'uuidv4';
export type UserActivationDocument = UserActivationModel &
  CustomMongooseDocument;

@Schema({ collection: 'users_activation' })
export class UserActivation {
  @Prop({ default: uuid() })
  _id: string;
  @Prop({
    type: SchemaType.Types.ObjectId,
    ref: 'users',
  })
  user: SchemaType.Types.ObjectId;
  @Prop({
    type: Number,
    default: 0,
  })
  platform: Number;

  // * Migration fields
  @Prop()
  userId: String;
}

export const UserActivationSchema =
  SchemaFactory.createForClass(UserActivation);
