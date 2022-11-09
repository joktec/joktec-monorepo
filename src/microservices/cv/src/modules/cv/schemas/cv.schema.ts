import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CvDocument = Cv & CustomMongooseDocument;

@Schema({ collection: 'cv' })
export class Cv {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  contentType: string;

  @Prop()
  deleted: number;

  @Prop()
  email: string;

  @Prop()
  experience: string;

  @Prop()
  fullSize: number;

  @Prop()
  fullName: string;

  @Prop()
  gender: number;

  @Prop()
  htmlData: string;

  @Prop()
  industries: string;

  @Prop()
  link: string;

  @Prop()
  inputLink: string;

  @Prop()
  location: string;

  @Prop()
  nameFile: string;

  @Prop()
  notes: string;

  @Prop()
  phone: string;

  @Prop()
  position: string;

  @Prop()
  salary: number;

  @Prop()
  skill: string;

  @Prop()
  source: string;

  @Prop()
  status: string;

  @Prop()
  txtData: string;

  @Prop()
  userName: string;

  @Prop()
  birthday: Date;

  @Prop()
  referalLink: string;

  @Prop()
  tags: string;

  @Prop()
  description: string;

  @Prop()
  usernameType: string;

  @Prop()
  jsId: string;

  @Prop()
  jsType: string;

  @Prop()
  createByType: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  private: number;

  @Prop()
  isPicked: number;

  @Prop()
  linkCvRedacted: string;

  @Prop()
  ranking: string;

  @Prop()
  marketValueCurrency: string;

  @Prop()
  expectedSalaryCurrency: string;

  @Prop()
  functionId: number;

  @Prop()
  marketValue: number;

  @Prop()
  uploadedAvatar: string;

  @Prop()
  functions: string;

  @Prop()
  totalPool: number;

  @Prop()
  topCv: number;

  @Prop()
  analysis: string;

  @Prop()
  marketValueAi: number;

  @Prop()
  jobTitle: string;

  @Prop()
  companyTypes: string;

  @Prop()
  expectedSalary: number;

  @Prop()
  locations: string;

  @Prop()
  localtionId: number;

  @Prop()
  acContactId: string;

  @Prop()
  isTopCv: number;

  @Prop()
  isTpSetPrivate: number;

  @Prop()
  platform: number;

  @Prop()
  hopin: Date;

  @Prop()
  referalLinkAi: string;

  @Prop()
  lastUpdate: Date;

  @Prop()
  updateBy: Date;

  @Prop()
  createBy: string;

  @Prop()
  createDate: Date;
}

export const CvSchema = SchemaFactory.createForClass(Cv);
