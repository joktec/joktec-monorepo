import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CandidateIndustryDocument = CandidateIndustry  & CustomMongooseDocument;

@Schema({ collection: 'candidate_industry' })
export class CandidateIndustry {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  candidateId: string;
  @Prop()
  industryId: string;
}

export const CandidateIndustrySchema =
  SchemaFactory.createForClass(CandidateIndustry);
