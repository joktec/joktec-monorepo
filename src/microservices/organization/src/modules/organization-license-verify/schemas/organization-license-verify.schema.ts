import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type OrganizationLicenseVerifyDocument = OrganizationLicenseVerify &
  CustomMongooseDocument;

@Schema({ collection: 'organization_license_verify' })
export class OrganizationLicenseVerify {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  createdAt: Date;
  @Prop()
  step: number;
  @Prop()
  reminderDate: Date;
  @Prop()
  sent: number;
  @Prop()
  toInternal: number;
  @Prop()
  organizationId: string;
  @Prop()
  reminderType: string;
  @Prop()
  platform: number;
}

export const OrganizationLicenseVerifySchema = SchemaFactory.createForClass(
  OrganizationLicenseVerify,
);
