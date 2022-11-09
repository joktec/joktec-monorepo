import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { UserLocation as UserLocationModel } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type UserLocationDocument = UserLocationModel & CustomMongooseDocument;

@Schema({ collection: 'user_location' })
export class UserLocation {
  @Prop({ default: uuid() })
  _id: string;
  @Prop({
    type: Number,
    default: 0,
  })
  lat: Number;
  @Prop({
    type: Number,
    default: 0,
  })
  lon: Number;
  @Prop({
    type: String,
    ref: 'users',
  })
  user: String;
  @Prop()
  userId: String;
}

export const UserLocationSchema = SchemaFactory.createForClass(UserLocation);
