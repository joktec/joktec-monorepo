import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type OrganizationRecruiterDocument = OrganizationRecruiter  & CustomMongooseDocument;

@Schema({ collection: 'organization_recruiter' })
export class OrganizationRecruiter {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  isActive: number;
  @Prop()
  isPrimary: number;
  @Prop()
  organizationId: string;
  @Prop()
  recruiterId: string;
  @Prop()
  status: string;
  @Prop()
  approvedAt: Date;
  @Prop()
  jobId: string;
  @Prop()
  reason: string;
  @Prop()
  updatedBy: string;
  @Prop()
  usersId: string;
}

export const OrganizationRecruiterSchema = SchemaFactory.createForClass(
  OrganizationRecruiter,
);
