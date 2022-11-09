import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CandidateLinkDocument = CandidateLink  & CustomMongooseDocument;

@Schema({ collection: 'candidate_link' })
export class CandidateLink {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  linkId: string;
  @Prop()
  candidateId: string;
  @Prop()
  createBy: string;
  @Prop()
  createDate: Date;
  @Prop()
  lastUpdate: Date;
  @Prop()
  name: string;
}

export const CandidateLinkSchema = SchemaFactory.createForClass(CandidateLink);
