import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class OrganizationLicenseVerify extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  step!: number;

  @Field(() => String, {
    nullable: true,
  })
  reminderDate!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  sent!: number;

  @Field(() => Int, {
    nullable: true,
  })
  toInternal!: number;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  reminderType!: string;

  @Field(() => Int, {
    nullable: true,
  })
  platform!: number;
}

@ObjectType()
export class OrganizationLicenseVerifyDetail extends OrganizationLicenseVerify {}

@ObjectType()
export class OrganizationLicenseVerifyListReponse extends BaseListResponse({
  viewDto: OrganizationLicenseVerify,
}) {}
