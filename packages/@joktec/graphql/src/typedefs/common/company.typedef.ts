import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse } from '../base.typedef';
import { Organization } from '..';

@ObjectType()
export class Company {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  nameEng: string;

  @Field(() => String, { nullable: true })
  organizationId: string;

  @Field(() => Organization, { nullable: true })
  organization: Organization;

  @Field(() => String, { nullable: true })
  value: string;
}

@ObjectType()
export class CompanyDetail extends Company {}

@ObjectType()
export class CompanyListResponse extends BaseListResponse({
  viewDto: Company,
}) {}
