import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type OrganizationFirstJobDocument = OrganizationFirstJob  & CustomMongooseDocument;

@Schema({ collection: 'organization_first_job' })
export class OrganizationFirstJob {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  organizationId: string;
  @Prop()
  jobId: string;
}

export const OrganizationFirstJobSchema =
  SchemaFactory.createForClass(OrganizationFirstJob);
