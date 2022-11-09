import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type OrganizationExpiredPackageDocument = OrganizationExpiredPackage &
  CustomMongooseDocument;

@Schema({ collection: 'organization_expired_package' })
export class OrganizationExpiredPackage {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  created: Date;
  @Prop()
  updated: Date;
  @Prop()
  organizationId: string;
  @Prop()
  packageId: number;
}

export const OrganizationExpiredPackageSchema = SchemaFactory.createForClass(
  OrganizationExpiredPackage,
);
