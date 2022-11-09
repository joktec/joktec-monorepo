import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CandidateAttachDocument = CandidateAttach & CustomMongooseDocument;

@Schema({ collection: 'candidate_atach' })
export class CandidateAttach {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  sqlId: string;

  @Prop()
  candidateId: string;

  @Prop()
  contentType: string;

  @Prop()
  fileSize: number;

  @Prop()
  lastUpdate: Date;

  @Prop()
  link: string;

  @Prop()
  name: string;

  @Prop()
  updateBy: string;

  @Prop()
  deleted: number;

  @Prop()
  oldCandidateId: string;
}

export const CandidateAttachSchema =
  SchemaFactory.createForClass(CandidateAttach);
