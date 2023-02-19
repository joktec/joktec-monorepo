import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerFollowedOrganization extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  following!: number;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  emailSubscribed!: number;

  @Field(() => Int, {
    nullable: true,
  })
  numberOfFollowTime!: number;

  @Field(() => String, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updatedAt!: Date;
}

@ObjectType()
export class JobSeekerFollowedOrganizationDetail extends JobSeekerFollowedOrganization {}

@ObjectType()
export class JobSeekerFollowedOrganizationListReponse extends BaseListResponse({
  viewDto: JobSeekerFollowedOrganization,
}) {}
