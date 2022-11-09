import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { UserCv as UserCvModel } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type UserCvDocument = UserCvModel & CustomMongooseDocument;

@Schema({ collection: 'users_cv' })
export class UserCv {
  @Prop({ default: uuid() })
  _id: string;
  @Prop({
    type: String,
    required: true,
  })
  status: String;
  @Prop()
  originalLink: String;
  @Prop({
    type: String,
    ref: 'users',
  })
  user: String;
  @Prop({
    type: String,
    ref: 'organizations',
  })
  organization: String;
  @Prop({
    type: String,
    ref: 'cvs',
  })
  cv: String;
  // * Migration fields
  @Prop()
  cvId: String;
  @Prop()
  organizationId: String;
  @Prop()
  userId: String;
}

export const UserCvSchema = SchemaFactory.createForClass(UserCv);
