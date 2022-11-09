import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class OrganizationFirstJob extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;
}

@ObjectType()
export class OrganizationFirstJobDetail extends OrganizationFirstJob {}

@ObjectType()
export class OrganizationFirstJobListReponse extends BaseListResponse({
  viewDto: OrganizationFirstJob,
}) {}
