import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse } from '../base.typedef';
import { JobCity } from './job-city.typedef';
import { JobDistrict } from './job-district.typedef';
import { JobIndustry } from './job-industry.typedef';
import { JobLanguage } from './job-language.typedef';
import { JobType } from './job-type.typedef';
import { Job } from './job.typedef';

@ObjectType()
export class JobVersion {
  @Field(() => String, {
    nullable: true,
  })
  jobVersionId!: string;

  @Field(() => String, {
    nullable: true,
  })
  benefit: string;

  @Field(() => String, {
    nullable: true,
  })
  benefitOther: string;

  @Field(() => String, {
    nullable: true,
  })
  cityId: string;

  @Field(() => Number, {
    nullable: true,
  })
  deleted: number;

  @Field(() => String, {
    nullable: true,
  })
  description: string;

  @Field(() => String, {
    nullable: true,
  })
  descriptionText: string;

  @Field(() => String, {
    nullable: true,
  })
  districtId: string;

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
  jobId: string;

  @Field(() => String, {
    nullable: true,
  })
  jobTypeId: string;

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
  level: string;

  @Field(() => String, {
    nullable: true,
  })
  location: string;

  @Field(() => String, {
    nullable: true,
  })
  position: string;

  @Field(() => Number, {
    nullable: true,
  })
  quantity: number;

  @Field(() => String, {
    nullable: true,
  })
  requestDate: Date;

  @Field(() => String, {
    nullable: true,
  })
  requirement: string;

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
  status: string;

  @Field(() => String, {
    nullable: true,
  })
  tags: string;

  @Field(() => Number, {
    nullable: true,
  })
  version_number: number;
}

@ObjectType()
export class JobVersionDetail extends JobVersion {
  @Field(() => JobCity, {
    nullable: true,
  })
  city: JobCity;

  @Field(() => JobDistrict, {
    nullable: true,
  })
  district: JobDistrict;

  @Field(() => JobIndustry, {
    nullable: true,
  })
  industry: JobIndustry;

  @Field(() => Job, {
    nullable: true,
  })
  job: Job;

  @Field(() => JobType, {
    nullable: true,
  })
  jobType: JobType;

  @Field(() => JobLanguage, {
    nullable: true,
  })
  language: JobLanguage;
}

@ObjectType()
export class JobVersionListResponse extends BaseListResponse({
  viewDto: JobVersion,
}) {}
