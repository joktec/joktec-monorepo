import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class OrganizationPackageLog extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  credits!: number;

  @Field(() => String, {
    nullable: true,
  })
  created!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updated!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  eventType!: number;

  @Field(() => String, {
    nullable: true,
  })
  packageBoughtDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  awardType!: string;

  @Field(() => String, {
    nullable: true,
  })
  createdById!: string;

  @Field(() => Int, {
    nullable: true,
  })
  packageId!: number;

  @Field(() => String, {
    nullable: true,
  })
  updatedById!: string;

  @Field(() => String, {
    nullable: true,
  })
  candidateId!: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  isThumbedUp!: number;

  @Field(() => String, {
    nullable: true,
  })
  comment!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;

  @Field(() => String, {
    nullable: true,
  })
  staffUser!: string;

  @Field(() => Int, {
    nullable: true,
  })
  remainingCredits!: number;

  @Field(() => Int, {
    nullable: true,
  })
  platform!: number;

  @Field(() => Int, {
    nullable: true,
  })
  isTrialCredits!: number;

  @Field(() => Int, {
    nullable: true,
  })
  totalCredits!: number;
}

@ObjectType()
export class OrganizationPackageLogDetail extends OrganizationPackageLog {}

@ObjectType()
export class OrganizationPackageLogListReponse extends BaseListResponse({
  viewDto: OrganizationPackageLog,
}) {}
