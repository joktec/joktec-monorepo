import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CandidateFunctionDocument = CandidateFunction  & CustomMongooseDocument;

@Schema({ collection: 'candidate_function' })
export class CandidateFunction {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  candidateId: string;
  @Prop()
  functionId: number;
}

export const CandidateFunctionSchema =
  SchemaFactory.createForClass(CandidateFunction);
