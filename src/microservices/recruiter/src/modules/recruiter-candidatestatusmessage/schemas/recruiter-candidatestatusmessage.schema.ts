import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type RRecruiterCandidatestatusmessageDocument =
  RecruiterCandidatestatusmessage & CustomMongooseDocument;

@Schema({ collection: 'recruiter_candidatestatusmessage' })
export class RecruiterCandidatestatusmessage {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  status: string;

  @Prop()
  vi: string;

  @Prop()
  en: string;

  @Prop()
  titleEn: string;

  @Prop()
  titleVi: string;
}

export const RecruiterCandidatestatusmessageSchema =
  SchemaFactory.createForClass(RecruiterCandidatestatusmessage);
