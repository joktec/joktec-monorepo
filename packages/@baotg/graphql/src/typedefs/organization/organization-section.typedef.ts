import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class OrganizationSection extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  title!: string;

  @Field(() => String, {
    nullable: true,
  })
  description!: string;

  @Field(() => String, {
    nullable: true,
  })
  titleVi!: string;

  @Field(() => String, {
    nullable: true,
  })
  descriptionVi!: string;

  @Field(() => Int, {
    nullable: true,
  })
  order!: number;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;
}

@ObjectType()
export class OrganizationSectionDetail extends OrganizationSection {}

@ObjectType()
export class OrganizationSectionListReponse extends BaseListResponse({
  viewDto: OrganizationSection,
}) {}
