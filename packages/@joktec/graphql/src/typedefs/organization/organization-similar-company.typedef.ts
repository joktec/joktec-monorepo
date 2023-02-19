import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class OrganizationSimilarCompany extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  priority!: number;

  @Field(() => String, {
    nullable: true,
  })
  linkedOrganizationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;
}

@ObjectType()
export class OrganizationSimilarCompanyDetail extends OrganizationSimilarCompany {}

@ObjectType()
export class OrganizationSimilarCompanyListReponse extends BaseListResponse({
  viewDto: OrganizationSimilarCompany,
}) {}
