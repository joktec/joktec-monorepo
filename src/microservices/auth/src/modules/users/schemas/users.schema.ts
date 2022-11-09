import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { User as UserModel } from '@jobhopin/core';
import { uuid } from 'uuidv4';
import {
  COLLECTION_NAME,
  PASSWORD_SALT_ROUNDS,
  PASSWORD_SALT_PREFIX,
} from '../users.constants';

type Methods = {
  readonly $hashPassword: (password: string) => string;
  readonly $authenticateLocal: (password: string) => boolean;
};

export type UserDocument = CustomMongooseDocument & UserModel & Methods;

@Schema({ collection: COLLECTION_NAME })
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

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: Function) {
  // tslint:disable-next-line
  const self = this as any;
  if (self.password && self.isModified('password')) {
    self.set('password', await self.$hashPassword(self.password));
  }

  next();
});

// tslint:disable-next-line:no-object-mutation
Object.assign(UserSchema.methods, {
  async $hashPassword(password: string) {
    const salt = genSaltSync(PASSWORD_SALT_ROUNDS);
    const passwordHash = await hashSync(password, salt);
    return passwordHash.replace('$2b', PASSWORD_SALT_PREFIX);
  },
  async $authenticateLocal(password: string) {
    const isValid = await compareSync(password, this.password);

    return isValid;
  },
});

export { UserSchema };
