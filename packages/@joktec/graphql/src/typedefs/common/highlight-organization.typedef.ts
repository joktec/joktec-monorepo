import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Organization } from '../organization/organization.typedef';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class HighlightOrganization extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  id!: number;

  @Field(() => Boolean, {
    nullable: true,
  })
  businessVerified!: boolean;

  @Field(() => String, {
    nullable: true,
  })
  coverImageUrl!: string;

  @Field(() => String, {
    nullable: true,
  })
  customUrlCompany!: string;

  @Field(() => String, {
    nullable: true,
  })
  logo!: string;

  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => Number, {
    nullable: true,
  })
  position!: number;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => Organization, {
    nullable: true,
  })
  organization!: Organization;

  @Field(() => String, {
    nullable: true,
  })
  publicId!: string;
}

@ObjectType()
export class HighlightOrganizationDetail extends HighlightOrganization {}

@ObjectType()
export class HighlightOrganizationListResponse extends BaseListResponse({
  viewDto: HighlightOrganization,
}) {}
