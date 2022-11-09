import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type OrganizationMediaDocument = OrganizationMedia  & CustomMongooseDocument;

@Schema({ collection: 'organization_media' })
export class OrganizationMedia {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  contentType: string;
  @Prop()
  fileSize: number;
  @Prop()
  lastUpdate: Date;
  @Prop()
  name: string;
  @Prop()
  organizationId: string;
  @Prop()
  type: string;
  @Prop()
  updateBy: string;
  @Prop()
  url: string;
  @Prop()
  thumbnailVideo: string;
  @Prop()
  thumbnailVideoSmall: string;
  @Prop()
  thumbnailCover: string;
  @Prop()
  thumbnailCoverSmall: string;
  @Prop()
  thumbnailLarge: string;
  @Prop()
  thumbnailMedium: string;
  @Prop()
  thumbnailMediumSmall: string;
  @Prop()
  thumbnailSmall: string;
  @Prop()
  thumbnailExtraSmall: string;
  @Prop()
  nameVi: string;
}

export const OrganizationMediaSchema =
  SchemaFactory.createForClass(OrganizationMedia);
