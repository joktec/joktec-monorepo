import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type OrganizationInsiderDocument = OrganizationInsider  & CustomMongooseDocument;

@Schema({ collection: 'organization_insider' })
export class OrganizationInsider {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  created: Date;
  @Prop()
  updated: Date;
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  thumbnail: string;
  @Prop()
  thumbnailLarge: string;
  @Prop()
  thumbnailMedium: string;
  @Prop()
  thumbnailSmall: string;
  @Prop()
  jobTitleId: number;
  @Prop()
  organizationId: string;
  @Prop()
  title: string;
  @Prop()
  descriptionVi: string;
  @Prop()
  nameVi: string;
  @Prop()
  titleVi: string;
  @Prop()
  linkedinLink: string;
  @Prop()
  quotes: string;
  @Prop()
  quotesVi: string;
  @Prop()
  websiteLink: string;
}

export const OrganizationInsiderSchema =
  SchemaFactory.createForClass(OrganizationInsider);
