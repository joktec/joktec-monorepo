import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class OrganizationRecruiter extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  isPrimary!: number;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  recruiterId!: string;

  @Field(() => String, {
    nullable: true,
  })
  status!: string;

  @Field(() => String, {
    nullable: true,
  })
  approvedAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;

  @Field(() => String, {
    nullable: true,
  })
  reason!: string;

  @Field(() => String, {
    nullable: true,
  })
  updatedBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  usersId!: string;
}

@ObjectType()
export class OrganizationRecruiterDetail extends OrganizationRecruiter {}

@ObjectType()
export class OrganizationRecruiterListReponse extends BaseListResponse({
  viewDto: OrganizationRecruiter,
}) {}
