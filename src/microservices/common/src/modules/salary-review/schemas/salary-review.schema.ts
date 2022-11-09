import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';

export type SalaryReviewDocument = SalaryReview & CustomMongooseDocument;

@Schema({ collection: 'salary_review' })
export class SalaryReview {
  @Prop({
    type: String,
  })
  username: string;

  @Prop({
    type: String,
  })
  overallExperience: string;

  @Prop({
    type: String,
  })
  jobTitle: string;

  @Prop({
    type: Number,
  })
  baseSalary: number;

  @Prop({
    type: String,
  })
  salaryPeriod: string;

  @Prop({
    type: String,
  })
  salaryCurrency: string;

  @Prop({
    type: Number,
  })
  jobStatus: number;

  @Prop({
    type: String,
  })
  status: string;

  @Prop({
    type: String,
  })
  rejectReason: string;

  @Prop({
    type: String,
  })
  prevStatus: string;

  @Prop({
    type: Number,
  })
  isAnonymous: number;

  @Prop({
    type: Number,
  })
  isSentNotification: number;

  @Prop({
    type: Number,
  })
  isValidSalaryRange: number;

  @Prop({
    type: Date,
  })
  checkSalaryRangeTime: Date;

  @Prop({
    type: Number,
  })
  baseSalaryUsdYear: number;

  @Prop({
    type: Number,
  })
  totalAdditionalIncomeUsdYear: number;

  @Prop({
    type: String,
  })
  jobTypeId: string;

  @Prop({
    type: String,
  })
  jobseekerId: string;

  @Prop({
    type: String,
  })
  levelId: string;

  @Prop({
    type: Number,
  })
  locationId: number;

  @Prop({
    type: String,
  })
  organizationId: string;

  @Prop({
    type: Number,
  })
  yearOfExperienceId: number;

  @Prop({
    type: Number,
  })
  totalAdditionalIncome: number;

  @Prop({
    type: Date,
  })
  approvalTime: Date;
}

export const SalaryReviewSchema = SchemaFactory.createForClass(SalaryReview);
