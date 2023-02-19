import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class OrganizationSize extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEn!: string;

  @Field(() => Int, {
    nullable: true,
  })
  priority!: number;

  @Field(() => Int, {
    nullable: true,
  })
  enabled!: number;
}

@ObjectType()
export class OrganizationSizeDetail extends OrganizationSize {}

@ObjectType()
export class OrganizationSizeListReponse extends BaseListResponse({
  viewDto: OrganizationSize,
}) {}
