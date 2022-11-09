import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobBountyDocument = JobBounty  & CustomMongooseDocument;

@Schema({ collection: 'job_bounty' })
export class JobBounty {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  bounty: number;

  @Prop()
  bountyCurrency: number;

  @Prop()
  bountyExpiration: Date;

  @Prop()
  bountyVariation: number;

  @Prop()
  companyHighlight: string;

  @Prop()
  companyHighlightVi: string;

  @Prop()
  createdAt: Date;

  @Prop()
  hotBounty: number;

  @Prop()
  isActive: number;

  @Prop()
  jobId: string;

  @Prop()
  percentageBountyVariation: number;

  @Prop()
  scInCharge: string;

  @Prop()
  tiInCharge: string;

  @Prop()
  tpInCharge: string;

  @Prop()
  updatedAt: Date;
}

export const JobBountySchema = SchemaFactory.createForClass(JobBounty);
