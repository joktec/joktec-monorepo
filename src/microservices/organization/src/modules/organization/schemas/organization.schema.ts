import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type OrganizationDocument = Organization  & CustomMongooseDocument;

@Schema({ collection: 'organization' })
export class Organization {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  address: string;
  @Prop()
  cityId: string;
  @Prop()
  countryId: string;
  @Prop()
  createBy: string;
  @Prop()
  createDate: Date;
  @Prop()
  description: string;
  @Prop()
  descriptionVi: string;
  @Prop()
  districtId: string;
  @Prop()
  emailAddress: string;
  @Prop()
  emailConnected: string;
  @Prop()
  emailPassword: string;
  @Prop()
  emailServerImap: string;
  @Prop()
  employeeNumber: string;
  @Prop()
  industryId: string;
  @Prop()
  languageId: string;
  @Prop()
  lastUpdate: string;
  @Prop()
  locationName: string;
  @Prop()
  locked: number;
  @Prop()
  logo: string;
  @Prop()
  name: string;
  @Prop()
  packageExpireDate: Date;
  @Prop()
  packageId: number;
  @Prop()
  publicId: string;
  @Prop()
  reasonWork: string;
  @Prop()
  source: string;
  @Prop()
  updateBy: string;
  @Prop()
  website: string;
  @Prop()
  jobSlot: number;
  @Prop()
  businessLicense: string;
  @Prop()
  businessLicenseName: string;
  @Prop()
  isFeatured: number;
  @Prop()
  recruiterEmail: string;
  @Prop()
  totalCredits: number;
  @Prop()
  remainingCredits: number;
  @Prop()
  headcountId: number;
  @Prop()
  jobTitleId: number;
  @Prop()
  organizationSizeId: number;
  @Prop()
  businessVerified: number;
  @Prop()
  locationId: number;
  @Prop()
  bonusCredits: number;
  @Prop()
  debtCredits: number;
  @Prop()
  autoFeeding: number;
  @Prop()
  activeBudget: number;
  @Prop()
  budgetCredits: number;
  @Prop()
  totalSlots: number;
  @Prop()
  remainingSlots: number;
  @Prop()
  budgetSlots: number;
  @Prop()
  videoLink: string;
  @Prop()
  totalOwner: number;
  @Prop()
  totalAdmin: number;
  @Prop()
  totalHrMember: number;
  @Prop()
  totalHiringManager: number;
  @Prop()
  totalUsers: number;
  @Prop()
  hsCompanyId: string;
  @Prop()
  descriptionPrivate: string;
  @Prop()
  descriptionPrivateVi: string;
  @Prop()
  customUrlCompany: string;
  @Prop()
  locationFilterId: string;
  @Prop()
  expiredCredits: number;
  @Prop()
  platform: number;
  @Prop()
  introducedJobmatch: number;
  @Prop()
  showCompanyPage: number;
  @Prop()
  totalJobInterviewSlots: number;
  @Prop()
  remainingJobInterviewSlots: number;
  @Prop()
  packageType: string;
  @Prop()
  isFptoActive: number;
  @Prop()
  vat: number;
  @Prop()
  isPartner: number;
  @Prop()
  numberOfJobViews: number;
  @Prop()
  followerInitial: number;
  @Prop()
  viewCount: number;
  @Prop()
  isOrgDemo: number;
  @Prop()
  wardId: number;
  @Prop()
  locCityId: number;
  @Prop()
  locDistrictId: number;
  @Prop()
  companyTag: string;
  @Prop()
  maxTiAssistedJob: number;
  @Prop()
  foundedIn: number;
  @Prop()
  slogan: string;
  @Prop()
  benefitOther: string;
  @Prop()
  inactive: number;
  @Prop()
  createdOn: string;
  @Prop()
  benefitOtherVi: string;
  @Prop({ type: Object || [] })
  specialties: object | [];
  @Prop({ type: Object || [] })
  socialChannel: object | [];
  @Prop()
  email: string;
  @Prop()
  phoneNumber: string;
  @Prop()
  companyTypeId: number;
  @Prop()
  sqlId: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
