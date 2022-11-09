import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class OrganizationCustomUrl extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  fromUrl!: string;

  @Field(() => String, {
    nullable: true,
  })
  toUrl!: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;
}

@ObjectType()
export class OrganizationCustomUrlDetail extends OrganizationCustomUrl {}

@ObjectType()
export class OrganizationCustomUrlListReponse extends BaseListResponse({
  viewDto: OrganizationCustomUrl,
}) {}
