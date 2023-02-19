import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class OrganizationExpiredPackage extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  created!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updated!: Date;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  packageId!: number;
}

@ObjectType()
export class OrganizationExpiredPackageDetail extends OrganizationExpiredPackage {}

@ObjectType()
export class OrganizationExpiredPackageListReponse extends BaseListResponse({
  viewDto: OrganizationExpiredPackage,
}) {}
