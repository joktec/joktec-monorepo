import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CvAnalysicFlowDocument = CvAnalysicFlow & CustomMongooseDocument;

@Schema({ collection: 'cv_analysic_flow' })
export class CvAnalysicFlow {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  cvId: string;

  @Prop()
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  averageSalary: number;

  @Prop()
  averageSalaryCurrency: string;

  @Prop()
  totalMatchJobs: number;

  @Prop()
  totalMatchOrgs: number;

  @Prop()
  jobsData: string;

  @Prop()
  orgsData: string;

  @Prop()
  isSuccess: number;

  @Prop()
  status: string;

  @Prop()
  flow: string;

  @Prop()
  aiTriggerAt: Date;

  @Prop()
  aiCallbackAt: Date;

  @Prop()
  aiCallbackData: string;

  @Prop()
  timeoutAt: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CvAnalysicFlowSchema =
  SchemaFactory.createForClass(CvAnalysicFlow);
