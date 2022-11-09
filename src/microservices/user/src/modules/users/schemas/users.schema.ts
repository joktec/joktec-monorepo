import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { User as UserModel } from '@jobhopin/core';
import { uuid } from 'uuidv4';
type Methods = {
  readonly $hashPassword: (password: string) => string;
  readonly $authenticateLocal: (password: string) => boolean;
};

export type UserDocument = UserModel & Methods & CustomMongooseDocument;

@Schema({ collection: 'users' })
export class User {
  @Prop({ default: uuid() })
  _id: string;
  @Prop({
    type: String,
    required: true,
  })
  email: String;
  @Prop({
    type: Number,
    default: 0,
  })
  active: Number;
  @Prop()
  address: String;
  @Prop()
  avatar: String;
  @Prop()
  birthday: Date;
  @Prop({
    type: Number,
    default: 0,
  })
  deleted: Number;
  @Prop()
  detail: String;
  @Prop()
  experience: String;
  @Prop({
    type: Number,
    default: 0,
  })
  gender: Number;
  @Prop({
    type: Number,
    default: 0,
  })
  locked: Number;
  @Prop()
  password: String;
  @Prop()
  position: String;
  @Prop()
  status: String;
  @Prop()
  title: String;
  @Prop()
  username: String;
  @Prop({
    type: Number,
    default: 0,
  })
  platform: Number;
  @Prop()
  cvChoose: String;
  @Prop()
  firstName: String;
  @Prop()
  fullName: String;
  @Prop()
  lastLogin: Date;

  lastName: String;
  @Prop()
  phoneNumber: String;
  @Prop()
  expireResetPass: Date;
  @Prop()
  tokenResetPass: String;
  @Prop()
  socialLink: String;
  @Prop({
    type: Number,
    default: 0,
  })
  isAutoCreated: Number;
  @Prop()
  legacyPassword: String;
  @Prop()
  fbId: String;
  @Prop()
  vneId: String;
  @Prop({
    type: Number,
    default: 0,
  })
  unlockConfirmShown: Number;
  @Prop()
  emailVerification: String;
  @Prop()
  lockedReasonCode: String;
  @Prop({
    type: Number,
    default: 0,
  })
  syncedPlatform: Number;

  // * Migration fields
  @Prop()
  userId: String;
  @Prop()
  memberRoleId: String;
}

export const UserSchema = SchemaFactory.createForClass(User);
