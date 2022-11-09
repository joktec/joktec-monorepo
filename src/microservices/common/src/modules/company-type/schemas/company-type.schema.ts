import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';

export type CompanyTypeDocument = CompanyType & CustomMongooseDocument;

@Schema({ collection: 'company_type' })
export class CompanyType {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  nameEn: string;

  @Prop({ type: Number })
  priority: number;
}

export const CompanyTypeSchema = SchemaFactory.createForClass(CompanyType);
