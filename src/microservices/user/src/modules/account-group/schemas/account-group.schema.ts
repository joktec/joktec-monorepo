import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
import { COLLECTION_NAME } from '../account-group.constants';
export type AccountGroupDocument = AccountGroup & CustomMongooseDocument;

@Schema({ collection: COLLECTION_NAME })
export class AccountGroup {
  @Prop({ default: uuid() })
  _id: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  codename: string;

  @Prop({ type: String })
  descriptionVi: string;

  @Prop({ type: String })
  nameVi: string;

  @Prop({ type: String })
  sqlId: string;

  @Prop({ type: Number })
  priority: number;
}

export const AccountGroupSchema = SchemaFactory.createForClass(AccountGroup);
