import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type OrganizationPackageLogDocument = OrganizationPackageLog  & CustomMongooseDocument;

@Schema({ collection: 'organization_package_log' })
export class OrganizationPackageLog {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  credits: number;
  @Prop()
  created: Date;
  @Prop()
  updated: Date;
  @Prop()
  eventType: number;
  @Prop()
  packageBoughtDate: Date;
  @Prop()
  awardType: string;
  @Prop()
  createdById: string;
  @Prop()
  packageId: number;
  @Prop()
  updatedById: string;
  @Prop()
  candidateId: string;
  @Prop()
  organizationId: string;
  @Prop()
  isThumbedUp: number;
  @Prop()
  comment: string;
  @Prop()
  jobId: string;
  @Prop()
  staffUser: string;
  @Prop()
  remainingCredits: number;
  @Prop()
  platform: number;
  @Prop()
  isTrialCredits: number;
  @Prop()
  totalCredits: number;
}

export const OrganizationPackageLogSchema = SchemaFactory.createForClass(
  OrganizationPackageLog,
);
