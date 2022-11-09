import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopBlacklistDomainDocument = JobhopBlacklistDomain &
  CustomMongooseDocument;

@Schema({ collection: 'jobhop_blacklistdomain' })
export class JobhopBlacklistDomain {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  domain: string;
}

export const JobhopBlacklistDomainSchema = SchemaFactory.createForClass(
  JobhopBlacklistDomain,
);
