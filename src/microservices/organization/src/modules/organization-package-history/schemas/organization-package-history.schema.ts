import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type OrganizationPackageHistoryDocument = OrganizationPackageHistory &
  CustomMongooseDocument;

@Schema({ collection: 'organization_package_history' })
export class OrganizationPackageHistory {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  organizationName: string;
  @Prop()
  action: string;
  @Prop()
  userEmail: string;
  @Prop()
  prevPackage: string;
  @Prop()
  newPackage: string;
  @Prop()
  organizationId: string;
  @Prop()
  bonusCredits: number;
  @Prop()
  maxAdmin: number;
  @Prop()
  maxJobInterview: number;
  @Prop()
  maxUser: number;
  @Prop()
  jobSlot: number;
  @Prop()
  oldPackageId: number;
  @Prop()
  packageId: number;
}

export const OrganizationPackageHistorySchema = SchemaFactory.createForClass(
  OrganizationPackageHistory,
);
