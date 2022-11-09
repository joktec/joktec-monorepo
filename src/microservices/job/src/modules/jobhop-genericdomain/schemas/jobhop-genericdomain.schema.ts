import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopGenericDomainDocument = JobhopGenericDomain &
  CustomMongooseDocument;

@Schema({ collection: 'jobhop_genericdomain' })
export class JobhopGenericDomain {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  domain: string;
}

export const JobhopGenericDomainSchema =
  SchemaFactory.createForClass(JobhopGenericDomain);
