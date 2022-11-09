import { Quizz } from './../quizz/quizz.typedef';
import { Organization } from '../organization';
import { JobIndustry } from './job-industry.typedef';
import { BaseListResponse, BaseTypedef } from '../base.typedef';
import { Field, ObjectType } from '@nestjs/graphql';
import { JobCity } from './job-city.typedef';
import { JobCountry } from './job-country.typedef';
import { JobDistrict } from './job-district.typedef';
import { JobLanguage } from './job-language.typedef';
import { JobLevel } from './job-level.typedef';
import { JobRecruiter } from './job-recruiter.typedef';
import { JobLocation } from './job-location.typedef';
import { JobVersion } from './job-version.typedef';

@ObjectType()
export class Job extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;

  @Field(() => String, {
    nullable: true,
  })
  description!: string;

  @Field(() => String, {
    nullable: true,
  })
  address!: string;

  @Field(() => Number, {
    nullable: true,
  })
  lat: number;

  @Field(() => Number, {
    nullable: true,
  })
  lng: number;

  @Field(() => String, {
    nullable: true,
  })
  benefit: string;

  @Field(() => String, {
    nullable: true,
  })
  benefitItemIds: string;

  @Field(() => String, {
    nullable: true,
  })
  benefitOther: string;

  @Field(() => String, {
    nullable: true,
  })
  cityId: string;

  @Field(() => String, {
    nullable: true,
  })
  countryId: string;

  @Field(() => String, {
    nullable: true,
  })
  createdBy: string;

  @Field(() => Number, {
    nullable: true,
  })
  deleted: number;

  @Field(() => String, {
    nullable: true,
  })
  createdDate: Date;

  @Field(() => String, {
    nullable: true,
  })
  descriptionText: string;

  @Field(() => String, {
    nullable: true,
  })
  districtId: string;

  @Field(() => Number, {
    nullable: true,
  })
  fed: number;

  @Field(() => String, {
    nullable: true,
  })
  feedDate: Date;

  @Field(() => Number, {
    nullable: true,
  })
  feedingcycle: number;

  @Field(() => String, {
    nullable: true,
  })
  image: string;

  @Field(() => String, {
    nullable: true,
  })
  industryId: string;

  @Field(() => String, {
    nullable: true,
  })
  jobType: string;

  @Field(() => String, {
    nullable: true,
  })
  jobWorkingTime: string;

  @Field(() => String, {
    nullable: true,
  })
  languageId: string;

  @Field(() => String, {
    nullable: true,
  })
  lastUpdate: Date;

  @Field(() => String, {
    nullable: true,
  })
  levelId: string;

  @Field(() => String, {
    nullable: true,
  })
  link: string;

  @Field(() => String, {
    nullable: true,
  })
  location: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId: string;

  @Field(() => String, {
    nullable: true,
  })
  position: string;

  @Field(() => String, {
    nullable: true,
  })
  publicId: string;

  @Field(() => Number, {
    nullable: true,
  })
  qualified: number;

  @Field(() => String, {
    nullable: true,
  })
  quantity: string;

  @Field(() => String, {
    nullable: true,
  })
  recruiterId: string;

  @Field(() => String, {
    nullable: true,
  })
  requestDate: Date;

  @Field(() => String, {
    nullable: true,
  })
  salaryCurrency: string;

  @Field(() => Number, {
    nullable: true,
  })
  salaryMax: number;

  @Field(() => Number, {
    nullable: true,
  })
  salaryMin: number;

  @Field(() => Number, {
    nullable: true,
  })
  salaryOption: number;

  @Field(() => String, {
    nullable: true,
  })
  salaryOther: string;

  @Field(() => Number, {
    nullable: true,
  })
  credits: number;

  @Field(() => String, {
    nullable: true,
  })
  salaryPayment: string;

  @Field(() => String, {
    nullable: true,
  })
  salaryType: string;

  @Field(() => String, {
    nullable: true,
  })
  status: string;

  @Field(() => String, {
    nullable: true,
  })
  submitDate: string;

  @Field(() => String, {
    nullable: true,
  })
  tags: string;

  @Field(() => String, {
    nullable: true,
  })
  updateBy: string;

  @Field(() => Number, {
    nullable: true,
  })
  viewCount: number;

  @Field(() => String, {
    nullable: true,
  })
  jobVersionId: string;

  @Field(() => String, {
    nullable: true,
  })
  AISkills: string;

  @Field(() => String, {
    nullable: true,
  })
  jobVnwName: string;

  @Field(() => String, {
    nullable: true,
  })
  jobItviecName: string;

  @Field(() => String, {
    nullable: true,
  })
  jobCbName: string;

  @Field(() => Number, {
    nullable: true,
  })
  renewed: number;

  @Field(() => String, {
    nullable: true,
  })
  renewedAt: Date;

  @Field(() => String, {
    nullable: true,
  })
  renewToken: string;

  @Field(() => String, {
    nullable: true,
  })
  expirationDate: Date;

  @Field(() => Number, {
    nullable: true,
  })
  totalCredits: number;

  @Field(() => Number, {
    nullable: true,
  })
  remainingCredits: number;

  @Field(() => String, {
    nullable: true,
  })
  subscriptionType: string;

  @Field(() => Number, {
    nullable: true,
  })
  isPublic: number;

  @Field(() => Number, {
    nullable: true,
  })
  totalView: number;

  @Field(() => Number, {
    nullable: true,
  })
  jobmatchCreditType: number;

  @Field(() => Number, {
    nullable: true,
  })
  sentJobmatch: number;

  @Field(() => String, {
    nullable: true,
  })
  descriptionLinkedin: string;

  @Field(() => String, {
    nullable: true,
  })
  crawledDescription: string;

  @Field(() => String, {
    nullable: true,
  })
  source: string;

  @Field(() => Number, {
    nullable: true,
  })
  locationId: number;

  @Field(() => String, {
    nullable: true,
  })
  publishedAt: Date;

  @Field(() => String, {
    nullable: true,
  })
  mapLocation: string;

  @Field(() => String, {
    nullable: true,
  })
  approved: string;

  @Field(() => String, {
    nullable: true,
  })
  approvedBy: string;

  @Field(() => String, {
    nullable: true,
  })
  approvedAt: Date;

  @Field(() => String, {
    nullable: true,
  })
  confidential: string;

  @Field(() => Number, {
    nullable: true,
  })
  activeBudget: number;

  @Field(() => String, {
    nullable: true,
  })
  bullhornJobId: string;

  @Field(() => Number, {
    nullable: true,
  })
  haveSuggestedCandidate: number;

  @Field(() => Number, {
    nullable: true,
  })
  haveNewCandidate: number;

  @Field(() => Number, {
    nullable: true,
  })
  haveMoreJmBudget: number;

  @Field(() => Number, {
    nullable: true,
  })
  jobinterviewApproved: number;

  @Field(() => String, {
    nullable: true,
  })
  jobinterviewApprovedBy: string;

  @Field(() => String, {
    nullable: true,
  })
  jobinterviewApprovedAt: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobinterviewAmount: Date;

  @Field(() => Number, {
    nullable: true,
  })
  isJobBounty: number;

  @Field(() => Number, {
    nullable: true,
  })
  platform: number;

  @Field(() => String, {
    nullable: true,
  })
  consultant: string;

  @Field(() => Number, {
    nullable: true,
  })
  isFptoActive: number;

  @Field(() => String, {
    nullable: true,
  })
  AITags: string;

  @Field(() => String, {
    nullable: true,
  })
  originalOrganizationId: string;

  @Field(() => String, {
    nullable: true,
  })
  AICrawlTag: string;

  @Field(() => String, {
    nullable: true,
  })
  workplaceType: string;

  @Field(() => String, {
    nullable: true,
  })
  aiSalaryCurrency: string;

  @Field(() => Number, {
    nullable: true,
  })
  aiSalaryMax: number;

  @Field(() => Number, {
    nullable: true,
  })
  aiSalaryMin: number;

  @Field(() => Number, {
    nullable: true,
  })
  wardId: number;

  @Field(() => Number, {
    nullable: true,
  })
  locCityId: number;

  @Field(() => Number, {
    nullable: true,
  })
  locDistrictId: number;

  @Field(() => Number, {
    nullable: true,
  })
  priority: number;

  @Field(() => String)
  jobFunctionIds: string;

  @Field(() => Number)
  quizId: number;

  @Field(() => Number)
  numberOfApplicants: number;
}

@ObjectType()
export class JobDetail extends Job {
  @Field(() => JobCity, {
    nullable: true,
  })
  city: JobCity;

  @Field(() => JobCountry, {
    nullable: true,
  })
  country: JobCountry;

  @Field(() => JobDistrict, {
    nullable: true,
  })
  district: JobDistrict;

  @Field(() => JobIndustry, {
    nullable: true,
  })
  industry: JobIndustry;

  @Field(() => JobLanguage, {
    nullable: true,
  })
  language: JobLanguage;

  @Field(() => JobLevel, {
    nullable: true,
  })
  level: JobLevel;

  @Field(() => JobRecruiter, {
    nullable: true,
  })
  recruiter: JobRecruiter;

  @Field(() => Organization, {
    nullable: true,
  })
  organization: Organization;

  @Field(() => JobLocation, {
    nullable: true,
  })
  locationDetail: JobLocation;

  @Field(() => JobVersion, {
    nullable: true,
  })
  jobVersion: JobVersion;

  @Field(() => JobVersion, {
    nullable: true,
  })
  quiz: Quizz;
}

@ObjectType()
export class JobListResponse extends BaseListResponse({
  viewDto: Job,
}) {}
