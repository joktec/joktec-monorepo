import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class OrganizationPlatform extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  created!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updated!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  platformId!: number;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;
}

@ObjectType()
export class OrganizationPlatformDetail extends OrganizationPlatform {}

@ObjectType()
export class OrganizationPlatformListReponse extends BaseListResponse({
  viewDto: OrganizationPlatform,
}) {}
