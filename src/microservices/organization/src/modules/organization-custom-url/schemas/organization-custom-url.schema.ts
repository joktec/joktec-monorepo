import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type OrganizationCustomUrlDocument = OrganizationCustomUrl  & CustomMongooseDocument;

@Schema({ collection: 'organization_custom_url' })
export class OrganizationCustomUrl {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  fromUrl: string;
  @Prop()
  toUrl: string;
  @Prop()
  organizationId: string;
}

export const OrganizationCustomUrlSchema = SchemaFactory.createForClass(
  OrganizationCustomUrl,
);
