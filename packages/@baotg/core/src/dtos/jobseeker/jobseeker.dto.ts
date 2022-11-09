import { BaseDto, BaseListResponseDto } from '../base.dto';

export class JobSeekerDto extends BaseDto {
  jobseekerId!: string;

  name!: string;

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

export class JobSeekerListReponseDto extends BaseListResponseDto<JobSeekerDto> {}
