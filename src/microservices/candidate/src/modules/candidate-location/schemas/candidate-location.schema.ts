import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CandidateLocationDocument = CandidateLocation  & CustomMongooseDocument;

@Schema({ collection: 'candidate_location' })
export class CandidateLocation {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  candidateId: string;
  @Prop()
  locationId: number;
}

export const CandidateLocationSchema =
  SchemaFactory.createForClass(CandidateLocation);
