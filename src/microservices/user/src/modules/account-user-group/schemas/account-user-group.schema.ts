import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
import { COLLECTION_NAME } from '../account-user-group.constants';
export type AccountUserGroupDocument = AccountUserGroup &
  CustomMongooseDocument;

@Schema({ collection: COLLECTION_NAME })
export class AccountUserGroup {
  @Prop({ default: uuid() })
  _id: string;

  @Prop({ type: String })
  user: string;

  @Prop({ type: String })
  usersId: string;

  @Prop({ type: String })
  accountgroup: string;

  @Prop({ type: String })
  accountgroupId: string;

  @Prop({ type: String })
  organizationId: string;

  @Prop({ type: String })
  sqlId: string;
}

export const AccountUserGroupSchema =
  SchemaFactory.createForClass(AccountUserGroup);
