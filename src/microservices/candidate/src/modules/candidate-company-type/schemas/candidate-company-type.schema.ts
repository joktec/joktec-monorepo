import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CandidateCompanyTypeDocument = CandidateCompanyType &
  CustomMongooseDocument;

@Schema({ collection: 'candidate_company_type' })
export class CandidateCompanyType {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  candidateId: string;
  @Prop()
  companyTypeId: number;
  @Prop()
  companyType: string;
  @Prop()
  candidate: string;
}

export const CandidateCompanyTypeSchema =
  SchemaFactory.createForClass(CandidateCompanyType);
