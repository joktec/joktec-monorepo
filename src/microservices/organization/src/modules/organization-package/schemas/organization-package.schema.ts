import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type OrganizationPackageDocument = OrganizationPackage  & CustomMongooseDocument;

@Schema({ collection: 'organization_package' })
export class OrganizationPackage {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  createBy: string;
  @Prop()
  createDate: Date;
  @Prop()
  lastUpdate: Date;
  @Prop()
  logo: string;
  @Prop()
  maxCandidate: number;
  @Prop()
  maxJob: number;
  @Prop()
  maxUser: number;
  @Prop()
  minimumPay: number;
  @Prop()
  name: string;
  @Prop()
  price: number;
  @Prop()
  priceUsd: number;
  @Prop()
  updateBy: string;
  @Prop()
  credits: number;
  @Prop()
  enabled: number;
  @Prop()
  bonusCreditPerct: number;
  @Prop()
  bonusCredits: number;
  @Prop()
  expiryMonth: number;
  @Prop()
  maxAdmin: number;
  @Prop()
  maxHrMember: number;
  @Prop()
  maxHiringManager: number;
  @Prop()
  expiryDay: number;
  @Prop()
  nameEng: string;
  @Prop()
  maxJobInterview: number;
  @Prop()
  maxTiAssistedJob: number;
}

export const OrganizationPackageSchema =
  SchemaFactory.createForClass(OrganizationPackage);
