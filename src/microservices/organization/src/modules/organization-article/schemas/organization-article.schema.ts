import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type OrganizationArticleDocument = OrganizationArticle  & CustomMongooseDocument;

@Schema({ collection: 'organization_article' })
export class OrganizationArticle {
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
  thumbnail: string;
  @Prop()
  thumbnailLarge: string;
  @Prop()
  thumbnailMedium: string;
  @Prop()
  thumbnailSmall: string;
  @Prop()
  organizationId: string;
  @Prop()
  source: string;
  @Prop()
  sourceVi: string;
  @Prop()
  descriptionVi: string;
  @Prop()
  titleVi: string;
  @Prop()
  sectionId: number;
}

export const OrganizationArticleSchema =
  SchemaFactory.createForClass(OrganizationArticle);
