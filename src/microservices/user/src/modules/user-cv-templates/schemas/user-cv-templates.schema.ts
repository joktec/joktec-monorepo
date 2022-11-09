import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { UserCvTemplate as UserCvTemplateModel } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type UserCvTemplateDocument = UserCvTemplateModel &
  CustomMongooseDocument;

@Schema({ collection: 'user_cv_template' })
export class UserCvTemplate {
  @Prop({ default: uuid() })
  _id: string;
  @Prop({
    type: String,
    required: true,
  })
  html: String;
  @Prop({
    type: String,
    required: true,
  })
  fileName: String;
  @Prop()
  linkCv: String;
  @Prop({
    type: String,
    ref: 'users',
  })
  user: String;

  // * Migration fields
  @Prop()
  userId: String;
}

export const UserCvTemplateSchema =
  SchemaFactory.createForClass(UserCvTemplate);
