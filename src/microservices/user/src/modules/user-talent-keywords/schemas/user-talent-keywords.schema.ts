import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { UserTalentKeyword as UserTalentKeywordModel } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type UserTalentKeywordDocument = UserTalentKeywordModel &
  CustomMongooseDocument;

@Schema({ collection: 'user_talent_keyword' })
export class UserTalentKeyword {
  @Prop({ default: uuid() })
  _id: string;
  @Prop({
    type: String,
    required: true,
  })
  email: String;
  // * Migration fields
  @Prop()
  talentKeywordId: String;
}

export const UserTalentKeywordSchema =
  SchemaFactory.createForClass(UserTalentKeyword);
