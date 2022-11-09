import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type OrganizationSizeDocument = OrganizationSize  & CustomMongooseDocument;

@Schema({ collection: 'organization_size' })
export class OrganizationSize {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  name: string;
  @Prop()
  nameEn: string;
  @Prop()
  priority: number;
  @Prop()
  enabled: number;
}

export const OrganizationSizeSchema =
  SchemaFactory.createForClass(OrganizationSize);
