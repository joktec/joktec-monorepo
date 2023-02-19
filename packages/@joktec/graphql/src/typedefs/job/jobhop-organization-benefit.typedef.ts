import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobhopOrganizationBenefit extends BaseTypedef {
  @Field(() => String, { nullable: true })
  created: string;

  @Field(() => String, { nullable: true })
  updated: string;

  @Field(() => String, { nullable: true })
  benefitId: string;

  @Field(() => String, { nullable: true })
  organizationId: string;
}

@ObjectType()
export class JobhopOrganizationBenefitDetail extends JobhopOrganizationBenefit {}

@ObjectType()
export class JobhopOrganizationBenefitListResponse extends BaseListResponse({
  viewDto: JobhopOrganizationBenefit,
}) {}
