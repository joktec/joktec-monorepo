import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopOrganizationBenefitDocument = JobhopOrganizationBenefit &
  CustomMongooseDocument;

@Schema({ collection: 'jobhop_organizationbenefit' })
export class JobhopOrganizationBenefit {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  created: string;

  @Prop()
  updated: string;

  @Prop()
  benefitId: string;

  @Prop()
  organizationId: string;
}

export const JobhopOrganizationBenefitSchema = SchemaFactory.createForClass(
  JobhopOrganizationBenefit,
);
