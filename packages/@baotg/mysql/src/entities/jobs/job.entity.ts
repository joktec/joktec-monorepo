import { Expose, instanceToPlain, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, plainToInstance } from '@baotg/core';
import { BaseEntity } from '../base.entity';
import { MysqlMapper } from '../../models';

@Expose({ name: 'job' })
export class JobEntity extends BaseEntity {
  @Expose({ name: 'job_id' })
  @IsNotEmpty()
  @IsString()
  jobId!: string;

  @Expose({ name: 'address' })
  @IsOptional()
  @IsString()
  address?: string;

  @Expose({ name: 'lat' })
  @IsOptional()
  @IsInt()
  lat?: number;

  @Expose({ name: 'lng' })
  @IsOptional()
  @IsInt()
  lng?: number;

  @Expose({ name: 'benefit' })
  @IsOptional()
  @IsString()
  benefit?: string;

  @Expose({ name: 'benefit_item_ids' })
  @IsOptional()
  benefitItemIds?: unknown;

  @Expose({ name: 'benefit_other' })
  @IsOptional()
  @IsString()
  benefitOther?: string;

  @Expose({ name: 'city_id' })
  @IsOptional()
  @IsString()
  cityId?: string;

  @Expose({ name: 'country_id' })
  @IsOptional()
  @IsString()
  countryId?: string;

  @Expose({ name: 'create_by' })
  @IsOptional()
  @IsString()
  createBy?: string;

  @Expose({ name: 'create_date' })
  @IsNotEmpty()
  @IsDate()
  createDate!: Date;

  @Expose({ name: 'deleted' })
  @IsOptional()
  @IsInt()
  deleted?: number;

  @Expose({ name: 'description' })
  @IsOptional()
  @IsString()
  description?: string;

  @Expose({ name: 'description_text' })
  @IsOptional()
  @IsString()
  descriptionText?: string;

  @Expose({ name: 'district_id' })
  @IsOptional()
  @IsString()
  districtId?: string;

  @Expose({ name: 'fed' })
  @IsOptional()
  fed?: unknown;

  @Expose({ name: 'feed_date' })
  @IsOptional()
  @IsDate()
  feedDate?: Date;

  @Expose({ name: 'feeding_cycle' })
  @IsOptional()
  @IsInt()
  feedingCycle?: number;

  @Expose({ name: 'image' })
  @IsOptional()
  @IsString()
  image?: string;

  @Expose({ name: 'industry_id' })
  @IsOptional()
  @IsString()
  industryId?: string;

  @Expose({ name: 'job_type' })
  @IsOptional()
  @IsString()
  jobType?: string;

  @Expose({ name: 'job_working_time' })
  @IsOptional()
  @IsString()
  jobWorkingTime?: string;

  @Expose({ name: 'language_id' })
  @IsOptional()
  @IsString()
  languageId?: string;

  @Expose({ name: 'last_update' })
  @IsOptional()
  @IsDate()
  lastUpdate?: Date;

  @Expose({ name: 'level_id' })
  @IsOptional()
  @IsString()
  levelId?: string;

  @Expose({ name: 'link' })
  @IsOptional()
  @IsString()
  link?: string;

  @Expose({ name: 'location' })
  @IsOptional()
  @IsString()
  location?: string;

  @Expose({ name: 'organization_id' })
  @IsOptional()
  @IsString()
  organizationId?: string;

  @Expose({ name: 'position' })
  @IsOptional()
  @IsString()
  position?: string;

  @Expose({ name: 'public_id' })
  @IsOptional()
  @IsString()
  publicId?: string;

  @Expose({ name: 'qualified' })
  @IsOptional()
  qualified?: unknown;

  @Expose({ name: 'quantity' })
  @IsOptional()
  @IsInt()
  quantity?: number;

  @Expose({ name: 'recruiter_id' })
  @IsOptional()
  @IsString()
  recruiterId?: string;

  @Expose({ name: 'request_date' })
  @IsOptional()
  @IsDate()
  requestDate?: Date;

  @Expose({ name: 'requirement' })
  @IsOptional()
  @IsString()
  requirement?: string;

  @Expose({ name: 'salary_currency' })
  @IsOptional()
  @IsString()
  salaryCurrency?: string;

  @Expose({ name: 'salary_max' })
  @IsOptional()
  @IsInt()
  salaryMax?: number;

  @Expose({ name: 'salary_min' })
  @IsOptional()
  @IsInt()
  salaryMin?: number;

  @Expose({ name: 'salary_option' })
  @IsOptional()
  salaryOption?: unknown;

  @Expose({ name: 'salary_other' })
  @IsOptional()
  @IsString()
  salaryOther?: string;

  @Expose({ name: 'credits' })
  @IsOptional()
  @IsInt()
  credits?: number;

  @Expose({ name: 'salary_payment' })
  @IsOptional()
  @IsString()
  salaryPayment?: string;

  @Expose({ name: 'salary_type' })
  @IsOptional()
  @IsString()
  salaryType?: string;

  @Expose({ name: 'status' })
  @IsOptional()
  @IsString()
  status?: string;

  @Expose({ name: 'submit_date' })
  @IsOptional()
  @IsDate()
  submitDate?: Date;

  @Expose({ name: 'tags' })
  @IsOptional()
  @IsString()
  tags?: string;

  @Expose({ name: 'update_by' })
  @IsOptional()
  @IsString()
  updateBy?: string;

  @Expose({ name: 'view_count' })
  @IsOptional()
  @IsInt()
  viewCount?: number;

  @Expose({ name: 'job_version_id' })
  @IsOptional()
  @IsString()
  jobVersionId?: string;

  @Expose({ name: 'AI_skills' })
  @IsOptional()
  @IsString()
  aiSkills?: string;

  @Expose({ name: 'job_vnw_name' })
  @IsOptional()
  @IsString()
  jobVnwName?: string;

  @Expose({ name: 'job_itviec_name' })
  @IsOptional()
  @IsString()
  jobItviecName?: string;

  @Expose({ name: 'job_cb_name' })
  @IsOptional()
  @IsString()
  jobCbName?: string;

  @Expose({ name: 'renewed' })
  @IsOptional()
  renewed?: unknown;

  @Expose({ name: 'renewed_at' })
  @IsOptional()
  @IsDate()
  renewedAt?: Date;

  @Expose({ name: 'renew_token' })
  @IsOptional()
  @IsString()
  renewToken?: string;

  @Expose({ name: 'expiration_date' })
  @IsOptional()
  @IsDate()
  expirationDate?: Date;

  @Expose({ name: 'total_credits' })
  @IsOptional()
  @IsInt()
  totalCredits?: number;

  @Expose({ name: 'remaining_credits' })
  @IsOptional()
  @IsInt()
  remainingCredits?: number;

  @Expose({ name: 'subscription_type' })
  @IsOptional()
  @IsString()
  subscriptionType?: string;

  @Expose({ name: 'is_public' })
  @IsOptional()
  isPublic?: unknown;

  @Expose({ name: 'total_views' })
  @IsOptional()
  @IsInt()
  totalViews?: number;

  @Expose({ name: 'jobmatch_credit_type' })
  @IsOptional()
  @IsInt()
  jobmatchCreditType?: number;

  @Expose({ name: 'sent_jobmatch' })
  @IsOptional()
  sentJobmatch?: unknown;

  @Expose({ name: 'description_linkedin' })
  @IsOptional()
  @IsString()
  descriptionLinkedin?: string;

  @Expose({ name: 'crawled_description' })
  @IsOptional()
  @IsString()
  crawledDescription?: string;

  @Expose({ name: 'source' })
  @IsOptional()
  @IsString()
  source?: string;

  @Expose({ name: 'location_id' })
  @IsOptional()
  @IsInt()
  locationId?: number;

  @Expose({ name: 'published_at' })
  @IsOptional()
  @IsDate()
  publishedAt?: Date;

  @Expose({ name: 'map_location' })
  @IsOptional()
  @IsString()
  mapLocation?: string;

  @Expose({ name: 'approved' })
  @IsOptional()
  approved?: unknown;

  @Expose({ name: 'approved_by' })
  @IsOptional()
  @IsString()
  approvedBy?: string;

  @Expose({ name: 'approved_at' })
  @IsOptional()
  @IsDate()
  approvedAt?: Date;

  @Expose({ name: 'confidential' })
  @IsOptional()
  confidential?: unknown;

  @Expose({ name: 'active_budget' })
  @IsOptional()
  @IsInt()
  activeBudget?: number;

  @Expose({ name: 'bullhorn_job_id' })
  @IsOptional()
  @IsString()
  bullhornJobId?: string;

  @Expose({ name: 'have_suggested_candidate' })
  @IsOptional()
  haveSuggestedCandidate?: unknown;

  @Expose({ name: 'have_new_candidate' })
  @IsOptional()
  haveNewCandidate?: unknown;

  @Expose({ name: 'have_more_jm_budget' })
  @IsOptional()
  haveMoreJmBudget?: unknown;

  @Expose({ name: 'jobinterview_approved' })
  @IsOptional()
  jobinterviewApproved?: unknown;

  @Expose({ name: 'jobinterview_approved_by' })
  @IsOptional()
  @IsString()
  jobinterviewApprovedBy?: string;

  @Expose({ name: 'jobinterview_approved_at' })
  @IsOptional()
  @IsDate()
  jobinterviewApprovedAt?: Date;

  @Expose({ name: 'jobinterview_amount' })
  @IsOptional()
  @IsInt()
  jobinterviewAmount?: number;

  @Expose({ name: 'is_job_bounty' })
  @IsOptional()
  isJobBounty?: unknown;

  @Expose({ name: 'platform' })
  @IsOptional()
  platform?: unknown;

  @Expose({ name: 'consultant' })
  @IsOptional()
  @IsString()
  consultant?: string;

  @Expose({ name: 'is_fpto_active' })
  @IsOptional()
  isFptoActive?: unknown;

  @Expose({ name: 'AI_tags' })
  @IsOptional()
  @IsString()
  aiTags?: string;

  @Expose({ name: 'original_organization_id' })
  @IsOptional()
  @IsString()
  originalOrganizationId?: string;

  @Expose({ name: 'AI_crawl_tag' })
  @IsOptional()
  @IsString()
  aiCrawlTag?: string;

  @Expose({ name: 'workplace_type' })
  @IsOptional()
  @IsString()
  workplaceType?: string;

  @Expose({ name: 'ai_salary_currency' })
  @IsOptional()
  @IsString()
  aiSalaryCurrency?: string;

  @Expose({ name: 'ai_salary_max' })
  @IsOptional()
  aiSalaryMax?: unknown;

  @Expose({ name: 'ai_salary_min' })
  @IsOptional()
  aiSalaryMin?: unknown;

  @Expose({ name: 'ward_id' })
  @IsOptional()
  @IsInt()
  wardId?: number;

  @Expose({ name: 'loc_city_id' })
  @IsOptional()
  @IsInt()
  locCityId?: number;

  @Expose({ name: 'loc_district_id' })
  @IsOptional()
  @IsInt()
  locDistrictId?: number;

  @Expose({ name: 'priority' })
  @IsOptional()
  @IsInt()
  priority?: number;

  @Expose({ name: 'assessment_test_status' })
  @IsOptional()
  @IsString()
  assessmentTestStatus?: string;

  @Expose({ name: 'job_function_ids' })
  @IsOptional()
  @IsString()
  jobFunctionIds?: string;

  @Expose({ name: 'quiz_id' })
  @IsOptional()
  @IsInt()
  quizId?: number;

  @Expose({ name: 'number_of_applicants' })
  @IsOptional()
  @IsInt()
  numberOfApplicants?: number;

  @Expose({ name: 'reject_reason' })
  @IsOptional()
  @IsString()
  rejectReason?: string;

  @Expose({ name: 'rejected_by' })
  @IsOptional()
  @IsString()
  rejectedBy?: string;

  @Expose({ name: 'rejected_at' })
  @IsOptional()
  @IsDate()
  rejectedAt?: Date;

  @Expose({ name: 'location_list' })
  @IsOptional()
  locationList?: unknown;

  @Expose({ name: 'job_function_orther_free_text' })
  @IsOptional()
  @IsString()
  jobFunctionOrtherFreeText?: string;
}

export class JobMapper extends MysqlMapper<JobEntity> {
  toPersistence = (domainModel: JobEntity) => instanceToPlain<JobEntity>(domainModel);
  toDomain = (persistenceModel: any): JobEntity => plainToInstance<JobEntity, any>(JobEntity, persistenceModel);
}
