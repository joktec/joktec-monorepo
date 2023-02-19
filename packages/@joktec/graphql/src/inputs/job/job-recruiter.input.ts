import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobRecruiterInput {
  @Field(() => String, {
    nullable: true,
  })
  recruiterId!: string;

  @Field(() => String, {
    nullable: true,
  })
  description: string;

  @Field(() => Number, {
    nullable: true,
  })
  disabled: number;

  @Field(() => Number, {
    nullable: true,
  })
  locked: number;

  @Field(() => String, {
    nullable: true,
  })
  email: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEng: string;

  @Field(() => String, {
    nullable: true,
  })
  logo: string;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId: string;

  @Field(() => String, {
    nullable: true,
  })
  title: string;

  @Field(() => String, {
    nullable: true,
  })
  userId: string;

  @Field(() => String, {
    nullable: true,
  })
  username: string;

  @Field(() => Number, {
    nullable: true,
  })
  deleted: number;

  @Field(() => Number, {
    nullable: true,
  })
  introducedJobmatched: number;

  @Field(() => Date, {
    nullable: true,
  })
  mailchimpSyncAt: Date;

  @Field(() => Date, {
    nullable: true,
  })
  activecampaignSyncAt: Date;

  @Field(() => String, {
    nullable: true,
  })
  activecampaignContactId: string;

  @Field(() => Number, {
    nullable: true,
  })
  platform: number;

  @Field(() => String, {
    nullable: true,
  })
  hsContactId: string;
}

@InputType()
export class CreateJobRecruiterInput extends BaseJobRecruiterInput {}

@InputType()
export class UpdateJobRecruiterInput extends BaseJobRecruiterInput {
  @Field()
  id!: string;
}

@InputType()
export class JobRecruiterPaginationInput extends BasePaginationInput {}

@InputType()
export class JobRecruiterConditionInput extends BaseConditionInput {}

@InputType()
export class JobRecruiterQueryInput extends BaseQueryInput({
  conditionInput: JobRecruiterConditionInput,
  paginationInput: JobRecruiterPaginationInput,
})<JobRecruiterConditionInput, JobRecruiterPaginationInput> {}
