import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class OrganizationLeaderProfile extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobTitle!: string;

  @Field(() => String, {
    nullable: true,
  })
  avatar!: string;

  @Field(() => String, {
    nullable: true,
  })
  linkedinLink!: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;
}

@ObjectType()
export class OrganizationLeaderProfileDetail extends OrganizationLeaderProfile {}

@ObjectType()
export class OrganizationLeaderProfileListReponse extends BaseListResponse({
  viewDto: OrganizationLeaderProfile,
}) {}
