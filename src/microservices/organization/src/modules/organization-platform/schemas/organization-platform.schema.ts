import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type OrganizationPlatformDocument = OrganizationPlatform  & CustomMongooseDocument;

@Schema({ collection: 'organization_platform' })
export class OrganizationPlatform {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  created: Date;
  @Prop()
  updated: Date;
  @Prop()
  platformId: number;
  @Prop()
  organizationId: string;
}

export const OrganizationPlatformSchema =
  SchemaFactory.createForClass(OrganizationPlatform);
