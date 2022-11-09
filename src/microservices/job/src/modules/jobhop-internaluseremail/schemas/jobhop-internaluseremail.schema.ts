import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopInternalUserEmailDocument = JobhopInternalUserEmail &
  CustomMongooseDocument;

@Schema({ collection: 'jobhop_internaluseremail' })
export class JobhopInternalUserEmail {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  emailTiopsTeam: string;

  @Prop()
  emailHiringTeam: string;

  @Prop()
  cc: string;

  @Prop()
  disabled: number;
}

export const JobhopInternalUserEmailSchema = SchemaFactory.createForClass(
  JobhopInternalUserEmail,
);
