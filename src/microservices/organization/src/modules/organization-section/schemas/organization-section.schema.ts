import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type OrganizationSectionDocument = OrganizationSection  & CustomMongooseDocument;

@Schema({ collection: 'organization_section' })
export class OrganizationSection {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  titleVi: string;
  @Prop()
  descriptionVi: string;
  @Prop()
  order: number;
  @Prop()
  organizationId: string;
}

export const OrganizationSectionSchema =
  SchemaFactory.createForClass(OrganizationSection);
