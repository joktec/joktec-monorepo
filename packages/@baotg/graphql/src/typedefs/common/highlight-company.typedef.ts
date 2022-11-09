import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';
import { Organization } from '../organization/organization.typedef';

@ObjectType()
export class HighlightCompany extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  id!: number;

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
}

@ObjectType()
export class HighlightCompanyDetail extends HighlightCompany {
  @Field(() => Organization, {
    nullable: true,
  })
  organization!: Organization;
}

@ObjectType()
export class HighlightListResponse extends BaseListResponse({
  viewDto: HighlightCompany,
}) {}
