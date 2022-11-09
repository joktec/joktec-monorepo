import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerVerifyAccountDocument = JobseekerVerifyAccount  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_verify_account' })
export class JobseekerVerifyAccount {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  note: string;

  @Prop()
  verifyMethod: string;

  @Prop()
  identityCardId: string;

  @Prop()
  isVerified: number;

  @Prop()
  approvedById: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  jobseekerId: string;

  @Prop()
  companyEmail: string;

  @Prop()
  updatedBy: string;
}

export const JobseekerVerifyAccountSchema = SchemaFactory.createForClass(JobseekerVerifyAccount);
