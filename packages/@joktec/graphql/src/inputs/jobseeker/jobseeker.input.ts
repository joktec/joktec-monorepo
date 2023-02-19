import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerInput {
  @Field(() => String, {
    nullable: false,
  })
  name!: string;

  @Field(() => String, {
    nullable: false,
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

  @Field(() => Date, {
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
  cvPrimary!: string;

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

  @Field(() => Date, {
    nullable: true,
  })
  mailchimpSyncAt!: Date;

  @Field(() => Date, {
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
  jobTitle!: string;

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
}

@InputType()
export class CreateJobSeekerInput extends BaseJobSeekerInput {}

@InputType()
export class UpdateJobSeekerInput extends BaseJobSeekerInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerConditionInput extends BaseConditionInput {
  @Field(() => [String], {
    nullable: true,
  })
  _id!: string[];

  @Field(() => [String], {
    nullable: true,
  })
  levelId!: string[];

  @Field(() => [String], {
    nullable: true,
  })
  username!: string[];
}

@InputType()
export class JobSeekerQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerConditionInput,
  paginationInput: JobSeekerPaginationInput,
})<JobSeekerConditionInput, JobSeekerPaginationInput> {}
