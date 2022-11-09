import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CandidateThumbdownCountDocument = CandidateThumbdownCount &
  CustomMongooseDocument;

@Schema({ collection: 'candidate_thumbdown_count' })
export class CandidateThumbdownCount {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  tickOn: number;
  @Prop()
  candidateId: string;
  @Prop()
  jobId: string;
  @Prop()
  userId: string;
}

export const CandidateThumbdownCountSchema = SchemaFactory.createForClass(
  CandidateThumbdownCount,
);
