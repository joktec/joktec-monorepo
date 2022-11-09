import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type OrganizationSimilarCompanyDocument = OrganizationSimilarCompany &
  CustomMongooseDocument;

@Schema({ collection: 'organization_similar_company' })
export class OrganizationSimilarCompany {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  priority: number;
  @Prop()
  linkedOrganizationId: string;
  @Prop()
  organizationId: string;
}

export const OrganizationSimilarCompanySchema = SchemaFactory.createForClass(
  OrganizationSimilarCompany,
);
