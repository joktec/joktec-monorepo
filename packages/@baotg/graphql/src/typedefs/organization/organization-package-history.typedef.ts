import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class OrganizationPackageHistory extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  organizationName!: string;

  @Field(() => String, {
    nullable: true,
  })
  action!: string;

  @Field(() => String, {
    nullable: true,
  })
  userEmail!: string;

  @Field(() => String, {
    nullable: true,
  })
  prevPackage!: string;

  @Field(() => String, {
    nullable: true,
  })
  newPackage!: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  bonusCredits!: number;

  @Field(() => Int, {
    nullable: true,
  })
  maxAdmin!: number;

  @Field(() => Int, {
    nullable: true,
  })
  maxJobInterview!: number;

  @Field(() => Int, {
    nullable: true,
  })
  maxUser!: number;

  @Field(() => Int, {
    nullable: true,
  })
  jobSlot!: number;

  @Field(() => Int, {
    nullable: true,
  })
  oldPackageId!: number;

  @Field(() => Int, {
    nullable: true,
  })
  packageId!: number;
}

@ObjectType()
export class OrganizationPackageHistoryDetail extends OrganizationPackageHistory {}

@ObjectType()
export class OrganizationPackageHistoryListReponse extends BaseListResponse({
  viewDto: OrganizationPackageHistory,
}) {}
