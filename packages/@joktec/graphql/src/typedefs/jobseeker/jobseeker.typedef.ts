import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeeker extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => Int, {
    nullable: true,
  })
  step!: number;

  @Field(() => Int, {
    nullable: true,
  })
  step0!: number;

  @Field(() => Int, {
    nullable: true,
  })
  step1!: number;

  @Field(() => Int, {
    nullable: true,
  })
  step2!: number;

  @Field(() => Int, {
    nullable: true,
  })
  step3!: number;

  @Field(() => Int, {
    nullable: true,
  })
  step4!: number;

  @Field(() => Int, {
    nullable: true,
  })
  step5!: number;

  @Field(() => Int, {
    nullable: true,
  })
  step6!: number;

  @Field(() => Int, {
    nullable: true,
  })
  step7!: number;

  @Field(() => String, {
    nullable: true,
  })
  industry!: string;

  @Field(() => String, {
    nullable: true,
  })
  skill!: string;

  @Field(() => String, {
    nullable: true,
  })
  birthday!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  platform!: number;

  @Field(() => String, {
    nullable: true,
  })
  publicId!: string;

  @Field(() => String, {
    nullable: true,
  })
  personalUrl!: string;

  @Field(() => String, {
    nullable: true,
  })
  createBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  createDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  cvPrimary!: string;

  @Field(() => String, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updateBy!: string;

  @Field(() => Int, {
    nullable: true,
  })
  salaryExpect!: number;

  @Field(() => Int, {
    nullable: true,
  })
  salaryExpectMax!: number;

  @Field(() => String, {
    nullable: true,
  })
  salaryExpectCurrency!: string;

  @Field(() => Int, {
    nullable: true,
  })
  isSeeking!: number;

  @Field(() => String, {
    nullable: true,
  })
  jobTitleSeeking!: string;

  @Field(() => String, {
    nullable: true,
  })
  levelId!: string;

  @Field(() => String, {
    nullable: true,
  })
  salaryCurrency!: string;

  @Field(() => String, {
    nullable: true,
  })
  createByType!: string;

  @Field(() => String, {
    nullable: true,
  })
  phoneNumber!: string;

  @Field(() => Int, {
    nullable: true,
  })
  isAutoCreated!: number;

  @Field(() => String, {
    nullable: true,
  })
  personalWebsite!: string;

  @Field(() => String, {
    nullable: true,
  })
  professionalWebsite!: string;

  @Field(() => Int, {
    nullable: true,
  })
  jsDefaultProfile!: number;

  @Field(() => Int, {
    nullable: true,
  })
  salaryCurrent!: number;

  @Field(() => Int, {
    nullable: true,
  })
  salaryCurrentMax!: number;

  @Field(() => String, {
    nullable: true,
  })
  salaryCurrentCurrency!: string;

  @Field(() => String, {
    nullable: true,
  })
  careerObjective!: string;

  @Field(() => String, {
    nullable: true,
  })
  coverImage!: string;

  @Field(() => String, {
    nullable: true,
  })
  mailchimpSyncAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  activecampaignSyncAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  activecampaignContactId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  remindProfileNotificationCount!: number;

  @Field(() => String, {
    nullable: true,
  })
  lastRemindProfileNotification!: string;

  @Field(() => Int, {
    nullable: true,
  })
  verifyAccountCount!: number;

  @Field(() => String, {
    nullable: true,
  })
  lastVerifyAccountDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobTitle!: string;

  @Field(() => String, {
    nullable: true,
  })
  startDate!: string;

  @Field(() => String, {
    nullable: true,
  })
  vneId!: string;

  @Field(() => String, {
    nullable: true,
  })
  lookingForJobStatus!: string;

  @Field(() => String, {
    nullable: true,
  })
  defaultCvTemplate!: string;

  @Field(() => Int, {
    nullable: true,
  })
  usedQuizUpdateProfileReward!: number;

  @Field(() => String, {
    nullable: true,
  })
  socialConnected!: string;

  @Field(() => String, {
    nullable: true,
  })
  defaultTemplate!: string;

  // add more populate field
  @Field(() => String, {
    nullable: true,
  })
  firstName!: string;

  @Field(() => String, {
    nullable: true,
  })
  lastName!: string;

  @Field(() => String, {
    nullable: true,
  })
  avatar!: string;
}

@ObjectType()
export class JobSeekerDetail extends JobSeeker {}

@ObjectType()
export class JobSeekerListReponse extends BaseListResponse({
  viewDto: JobSeeker,
}) {}
