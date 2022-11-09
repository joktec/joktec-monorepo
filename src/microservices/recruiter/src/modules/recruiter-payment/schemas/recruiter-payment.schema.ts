import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type RecruiterPaymentDocument = RecruiterPayment &
  CustomMongooseDocument;

@Schema({ collection: 'recruiter_payment' })
export class RecruiterPayment {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  recruiterPaymentId: string;

  @Prop()
  amount: number;

  @Prop()
  checkOutAt: Date;

  @Prop()
  createDate: Date;

  @Prop()
  currency: string;

  @Prop()
  orderCode: string;

  @Prop()
  organizationId: string;

  @Prop()
  packageId: number;

  @Prop()
  paidAt: Date;

  @Prop()
  paymentId: string;

  @Prop()
  paymentType: string;

  @Prop()
  recruiter: string;

  @Prop()
  secureCode: string;

  @Prop()
  status: string;

  @Prop()
  tokenNl: string;

  @Prop()
  numberOfMonths: number;

  @Prop()
  discount: number;

  @Prop()
  jobSlot: number;
}

export const RecruiterPaymentSchema =
  SchemaFactory.createForClass(RecruiterPayment);
