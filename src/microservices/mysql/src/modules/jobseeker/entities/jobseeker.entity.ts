import { Column, Entity } from 'typeorm';

@Entity('jobseeker')
export class Jobseeker {
  @Column('varchar', { primary: true, name: 'jobseeker_id', length: 255 })
  jobseekerId: string;

  @Column('varchar', {
    name: 'public_id',
    nullable: true,
    length: 255,
  })
  publicId: string | null;

  @Column('varchar', {
    name: 'personal_url',
    nullable: true,
    length: 255,
  })
  personalUrl: string | null;

  @Column('varchar', { name: 'create_by', nullable: true, length: 255 })
  createBy: string | null;

  @Column('timestamp', {
    name: 'create_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createDate: Date;

  @Column('varchar', { name: 'cv_primary', nullable: true, length: 255 })
  cvPrimary: string | null;

  @Column('timestamp', {
    name: 'last_update',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUpdate: Date | null;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('varchar', { name: 'update_by', nullable: true, length: 255 })
  updateBy: string | null;

  @Column('varchar', { name: 'username', nullable: true, length: 255 })
  username: string | null;

  @Column('bigint', { name: 'salary_expect', nullable: true })
  salaryExpect: string | null;

  @Column('bigint', { name: 'salary_expect_max', nullable: true })
  salaryExpectMax: string | null;

  @Column('varchar', {
    name: 'salary_expect_currency',
    nullable: true,
    length: 10,
  })
  salaryExpectCurrency: string | null;

  @Column('int', { name: 'step', nullable: true })
  step: number | null;

  @Column('bit', { name: 'step0', nullable: true })
  step0: boolean | null;

  @Column('bit', { name: 'step1', nullable: true })
  step1: boolean | null;

  @Column('bit', { name: 'step2', nullable: true })
  step2: boolean | null;

  @Column('bit', { name: 'step3', nullable: true })
  step3: boolean | null;

  @Column('int', { name: 'step4', nullable: true, default: () => "'0'" })
  step4: number | null;

  @Column('int', { name: 'step5', nullable: true, default: () => "'0'" })
  step5: number | null;

  @Column('int', { name: 'step6', nullable: true, default: () => "'0'" })
  step6: number | null;

  @Column('int', { name: 'step7', nullable: true, default: () => "'0'" })
  step7: number | null;

  @Column('bit', { name: 'is_seeking', nullable: true })
  isSeeking: boolean | null;

  @Column('varchar', { name: 'job_title_seeking', nullable: true, length: 255 })
  jobTitleSeeking: string | null;

  @Column('varchar', { name: 'level_id', nullable: true, length: 255 })
  levelId: string | null;

  @Column('varchar', { name: 'salary_currency', nullable: true, length: 255 })
  salaryCurrency: string | null;

  @Column('varchar', { name: 'create_by_type', nullable: true, length: 255 })
  createByType: string | null;

  @Column('longtext', { name: 'industry', nullable: true })
  industry: string | null;

  @Column('varchar', { name: 'phone_number', nullable: true, length: 255 })
  phoneNumber: string | null;

  @Column('longtext', { name: 'skill', nullable: true })
  skill: string | null;

  @Column('tinyint', {
    name: 'is_auto_created',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isAutoCreated: boolean | null;

  @Column('datetime', { name: 'birthday', nullable: true })
  birthday: Date | null;

  @Column('varchar', { name: 'personal_website', nullable: true, length: 200 })
  personalWebsite: string | null;

  @Column('varchar', {
    name: 'professional_website',
    nullable: true,
    length: 200,
  })
  professionalWebsite: string | null;

  @Column('tinyint', {
    name: 'js_default_profile',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  jsDefaultProfile: boolean | null;

  @Column('bigint', { name: 'salary_current', nullable: true })
  salaryCurrent: string | null;

  @Column('bigint', { name: 'salary_current_max', nullable: true })
  salaryCurrentMax: string | null;

  @Column('varchar', {
    name: 'salary_current_currency',
    nullable: true,
    length: 10,
  })
  salaryCurrentCurrency: string | null;

  @Column('text', { name: 'career_objective', nullable: true })
  careerObjective: string | null;

  @Column('varchar', { name: 'cover_image', nullable: true, length: 255 })
  coverImage: string | null;

  @Column('timestamp', { name: 'mailchimp_sync_at', nullable: true })
  mailchimpSyncAt: Date | null;

  @Column('timestamp', { name: 'activecampaign_sync_at', nullable: true })
  activecampaignSyncAt: Date | null;

  @Column('varchar', {
    name: 'activecampaign_contact_id',
    nullable: true,
    length: 50,
  })
  activecampaignContactId: string | null;

  @Column('smallint', {
    name: 'remind_profile_notification_count',
    nullable: true,
    default: () => "'0'",
  })
  remindProfileNotificationCount: number | null;

  @Column('datetime', {
    name: 'last_remind_profile_notification',
    nullable: true,
  })
  lastRemindProfileNotification: Date | null;

  @Column('smallint', {
    name: 'verify_account_count',
    nullable: true,
    default: () => "'0'",
  })
  verifyAccountCount: number | null;

  @Column('datetime', { name: 'last_verify_account_date', nullable: true })
  lastVerifyAccountDate: Date | null;

  @Column('varchar', { name: 'job_title', nullable: true, length: 255 })
  jobTitle: string | null;

  @Column('varchar', {
    name: 'start_date',
    nullable: true,
    length: 20,
    default: () => "'IMMEDIATELY'",
  })
  startDate: string | null;

  @Column('tinyint', {
    name: 'platform',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  platform: boolean | null;

  @Column('varchar', { name: 'vne_id', nullable: true, length: 50 })
  vneId: string | null;

  @Column('varchar', {
    name: 'looking_for_job_status',
    nullable: true,
    length: 20,
    default: () => "'PUBLIC'",
  })
  lookingForJobStatus: string | null;

  @Column('varchar', {
    name: 'default_cv_template',
    nullable: true,
    length: 50,
    default: () => "'JOBHOPIN'",
  })
  defaultCvTemplate: string | null;

  @Column('tinyint', {
    name: 'used_quiz_update_profile_reward',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  usedQuizUpdateProfileReward: boolean | null;

  @Column('varchar', { name: 'social_connected', nullable: true, length: 50 })
  socialConnected: string | null;

  @Column('varchar', {
    name: 'default_template',
    nullable: true,
    length: 20,
    default: () => "'JOBHOPIN'",
  })
  defaultTemplate: string | null;

  @Column('varchar', { name: 'linkedin_name', nullable: true, length: 255 })
  linkedinName: string | null;
}
