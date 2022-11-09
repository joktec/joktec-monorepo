import { CustomMongooseDocument } from '@jobhopin/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Decimal128, Mixed } from 'mongoose';
import { uuid } from 'uuidv4';
export type JobDocument = Job & CustomMongooseDocument;

@Schema({ collection: 'job' })
export class Job {
  @Prop({ default: uuid() })
  _id: string;

  @Prop({ type: String, length: 255 })
  address: string;

  @Prop({ type: Number, length: 11 })
  lat: Decimal128;

  @Prop({ type: Number, length: 11 })
  lng: Decimal128;

  @Prop({ type: String })
  benefit: string;

  @Prop({ type: Object })
  benefitItemIds: Mixed;

  @Prop({ type: String })
  benefitOther: string;

  @Prop({ type: String, length: 255 })
  cityId: string;

  @Prop({ type: String, length: 255 })
  countryId: string;

  @Prop({ type: String, length: 255 })
  createBy: string;

  @Prop({ type: Date, required: true })
  createdDate: Date;

  @Prop({ type: Number })
  deleted: number;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  descriptionText: string;

  @Prop({ type: String, length: 255 })
  districtId: string;

  @Prop({ type: Number, length: 1 })
  fed: number;

  @Prop({ type: Date })
  feedDate: Date;

  @Prop({ type: Number })
  feedingcycle: number;

  @Prop({ type: String })
  image: string;

  @Prop({ type: String, length: 255 })
  industryId: string;

  @Prop({ type: String, length: 255 })
  jobType: string;

  @Prop({ type: String, length: 255 })
  jobWorkingTime: string;

  @Prop({ type: String, length: 255 })
  languageId: string;

  @Prop({ type: Date })
  lastUpdate: Date;

  @Prop({ type: String, length: 255 })
  levelId: string;

  @Prop({ type: String })
  link: string;

  @Prop({ type: String, length: 255 })
  location: string;

  @Prop({ type: String })
  organizationId: string;

  @Prop({ type: String, length: 255 })
  position: string;

  @Prop({ type: String, length: 255 })
  publicId: string;

  @Prop({ type: Number, length: 1 })
  qualified: number;

  @Prop({ type: Number })
  quantity: number;

  @Prop({ type: String, length: 255 })
  recruiterId: string;

  @Prop({ type: Date })
  requestDate: Date;

  @Prop({ type: String })
  requirement: string;

  @Prop({ type: String, length: 255 })
  salaryCurrency: string;

  @Prop({ type: Number })
  salaryMax: number;

  @Prop({ type: Number })
  salaryMin: number;

  @Prop({ type: Number })
  salaryOption: number;

  @Prop({ type: String, length: 255 })
  salaryOther: string;

  @Prop({ type: Number })
  credits: number;

  @Prop({ type: String, length: 255 })
  salaryPayment: string;

  @Prop({ type: String, length: 255 })
  salaryType: string;

  @Prop({ type: String, length: 255 })
  status: string;

  @Prop({ type: Date })
  submitDate: Date;

  @Prop({ type: String, length: 255 })
  tags: string;

  @Prop({ type: String, length: 255 })
  updateBy: string;

  @Prop({ type: Number })
  viewCount: number;

  @Prop({ type: String, length: 255 })
  jobVersionId: string;

  @Prop({ type: String })
  AISkills: string;

  @Prop({ type: String, length: 255 })
  jobVnwName: string;

  @Prop({ type: String, length: 255 })
  jobItviecName: string;

  @Prop({ type: String, length: 255 })
  jobCbName: string;

  @Prop({ type: Number, length: 1 })
  renewed: number;

  @Prop({ type: Date })
  renewedAt: Date;

  @Prop({ type: String, length: 255 })
  renewToken: string;

  @Prop({ type: Date })
  expirationDate: Date;

  @Prop({ type: Number })
  totalCredits: number;

  @Prop({ type: Number })
  remainingCredits: number;

  @Prop({ type: String, length: 20 })
  subscriptionType: string;

  @Prop({ type: Number, length: 1 })
  isPublic: number;

  @Prop({ type: Number })
  totalView: number;

  @Prop({ type: Number })
  jobmatchCreditType: number;

  @Prop({ type: Number, length: 1 })
  sentJobmatch: number;

  @Prop({ type: String })
  descriptionLinkedin: string;

  @Prop({ type: String })
  crawledDescription: string;

  @Prop({ type: String, length: 10 })
  source: string;

  @Prop({ type: Number })
  locationId: number;

  @Prop({ type: Date })
  publishedAt: Date;

  @Prop({ type: String, length: 255 })
  mapLocation: string;

  @Prop({ type: Number, length: 1 })
  approved: number;

  @Prop({ type: String, length: 50 })
  approvedBy: string;

  @Prop({ type: Date })
  approvedAt: Date;

  @Prop({ type: Number })
  confidential: number;

  @Prop({ type: Number })
  activeBudget: number;

  @Prop({ type: String, length: 255 })
  bullhornJobId: string;

  @Prop({ type: Number, length: 1 })
  haveSuggestedCandidate: number;

  @Prop({ type: Number, length: 1 })
  haveNewCandidate: number;

  @Prop({ type: Number, length: 1 })
  haveMoreJmBudget: number;

  @Prop({ type: Number, length: 1 })
  jobinterviewApproved: number;

  @Prop({ type: String, length: 50 })
  jobinterviewApprovedBy: string;

  @Prop({ type: Date })
  jobinterviewApprovedAt: Date;

  @Prop({ type: Number })
  jobinterviewAmount: number;

  @Prop({ type: Number })
  isJobBounty: number;

  @Prop({ type: Number, length: 1 })
  platform: number;

  @Prop({ type: String, length: 255 })
  consultant: string;

  @Prop({ type: Number, length: 1 })
  isFptoActive: number;

  @Prop({ type: String, length: 255 })
  AITags: string;

  @Prop({ type: String, length: 255 })
  originalOrganizationId: string;

  @Prop({ type: String, length: 255 })
  AICrawlTag: string;

  @Prop({ type: String, length: 50 })
  workplaceType: string;

  @Prop({ type: String, length: 10 })
  aiSalaryCurrency: string;

  @Prop({ type: Number })
  aiSalaryMax: number;

  @Prop({ type: Number })
  aiSalaryMin: number;

  @Prop({ type: Number })
  wardId: number;

  @Prop({ type: Number })
  locCityId: number;

  @Prop({ type: Number })
  locDistrictId: number;

  @Prop({ type: Number })
  priority: number;
}

export const JobSchema = SchemaFactory.createForClass(Job);
