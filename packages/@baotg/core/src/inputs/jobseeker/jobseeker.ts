import { IsNotEmpty, IsEnum } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseJobSeekerInput implements IBaseInput {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  username!: string;

  step!: number;

  step0!: number;

  step1!: number;

  step2!: number;

  step3!: number;

  step4!: number;

  step5!: number;

  step6!: number;

  step7!: number;

  industry!: string;

  skill!: string;

  birthday!: Date;

  platform!: number;

  publicId!: string;

  personalUrl!: string;

  createBy!: string;

  createDate!: Date;

  cvPrimary!: string;

  lastUpdate!: Date;

  updateBy!: string;

  salaryExpect!: number;

  salaryExpectMax!: number;

  salaryExpectCurrency!: string;

  isSeeking!: number;

  jobTitleSeeking!: string;

  levelId!: string;

  salaryCurrency!: string;

  createByType!: string;

  phoneNumber!: string;

  isAutoCreated!: number;

  personalWebsite!: string;

  professionalWebsite!: string;

  jsDefaultProfile!: number;

  salaryCurrent!: number;

  salaryCurrentMax!: number;

  salaryCurrentCurrency!: string;

  careerObjective!: string;

  coverImage!: string;

  mailchimpSyncAt!: Date;

  activecampaignSyncAt!: Date;

  activecampaignContactId!: string;

  remindProfileNotificationCount!: number;

  lastRemindProfileNotification!: string;

  verifyAccountCount!: number;

  lastVerifyAccountDate!: Date;

  jobTitle!: string;

  startDate!: string;

  vneId!: string;

  lookingForJobStatus!: string;

  defaultCvTemplate!: string;

  usedQuizUpdateProfileReward!: number;

  socialConnected!: string;

  defaultTemplate!: string;
}

export class CreateJobSeekerInput extends BaseJobSeekerInput implements IBaseCreateInput {}

export class UpdateJobSeekerInput extends BaseJobSeekerInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class JobSeekerPaginationInput extends BasePaginationInput {}

export class JobSeekerConditionInput extends BaseConditionInput {}

export class JobSeekerQueryInput extends BaseQueryInput<JobSeekerConditionInput, JobSeekerPaginationInput> {}
