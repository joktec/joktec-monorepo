import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type RecruiterContactDocument = RecruiterContact &
  CustomMongooseDocument;

@Schema({ collection: 'recruiter_contact' })
export class RecruiterContact {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  fullName: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  email: string;

  @Prop()
  company: string;

  @Prop()
  location: string;

  @Prop()
  referralEmail: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updateAt: Date;
}

export const RecruiterContactSchema =
  SchemaFactory.createForClass(RecruiterContact);
