import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopPaymentLinkDocument = JobhopPaymentLink &
  CustomMongooseDocument;

@Schema({ collection: 'jobhop_paymentlink' })
export class JobhopPaymentLink {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  token: string;

  @Prop()
  validTo: Date;

  @Prop()
  update: Date;

  @Prop()
  created: Date;

  @Prop()
  used: number;

  @Prop()
  organizationId: string;

  @Prop()
  packageId: number;

  @Prop()
  selected: number;

  @Prop()
  vat: number;
}

export const JobhopPaymentLinkSchema =
  SchemaFactory.createForClass(JobhopPaymentLink);
