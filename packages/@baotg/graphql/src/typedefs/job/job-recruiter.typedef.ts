import { BaseTypedef, BaseListResponse } from '../base.typedef';
import { Field, ObjectType } from '@nestjs/graphql';
import { Organization } from '../organization';
import { JobUser } from './job-user.typedef';

@ObjectType()
export class JobRecruiter extends BaseTypedef {
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

  @Field(() => String, {
    nullable: true,
  })
  mailchimpSyncAt: Date;

  @Field(() => String, {
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

@ObjectType()
export class JobRecruiterDetail extends JobRecruiter {
  @Field(() => Organization, {
    nullable: true,
  })
  organization: Organization;

  @Field(() => JobUser, {
    nullable: true,
  })
  user: JobUser;
}

@ObjectType()
export class JobRecruiterListResponse extends BaseListResponse({
  viewDto: JobRecruiter,
}) {}
