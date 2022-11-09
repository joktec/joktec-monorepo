import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import {
  UserEmailVerification as UserEmailVerificationModel,
  UserEmailVerificationStatusType,
} from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type UserEmailVerificationDocument = UserEmailVerificationModel &
  CustomMongooseDocument;

@Schema({ collection: 'user_email_verification' })
export class UserEmailVerification {
  @Prop({ default: uuid() })
  _id: string;
  @Prop({
    type: String,
    required: true,
  })
  email: String;
  @Prop()
  password: String;
  @Prop()
  verifyCode: String;
  @Prop({
    type: String,
    enum: UserEmailVerificationStatusType,
  })
  verifyCodeStatus: String;

  // * Migration fields
  @Prop()
  userId: String;
}

export const UserEmailVerificationSchema = SchemaFactory.createForClass(
  UserEmailVerification,
);
