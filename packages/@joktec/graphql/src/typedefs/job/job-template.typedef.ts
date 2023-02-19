import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobTemplate extends BaseTypedef {
  @Field(() => String, { nullable: true })
  benefitEn: string;

  @Field(() => String, { nullable: true })
  benefitVi: string;

  @Field(() => String, { nullable: true })
  descriptionEn: string;

  @Field(() => String, { nullable: true })
  descriptionVi: string;

  @Field(() => String, { nullable: true })
  industryEn: string;

  @Field(() => String, { nullable: true })
  industryVi: string;

  @Field(() => String, { nullable: true })
  lastUpdate: Date;

  @Field(() => String, { nullable: true })
  requirementEn: string;

  @Field(() => String, { nullable: true })
  requirementVi: string;

  @Field(() => String, { nullable: true })
  title: string;
}

@ObjectType()
export class JobTemplateDetail extends JobTemplate {}

@ObjectType()
export class JobTemplateListResponse extends BaseListResponse({
  viewDto: JobTemplate,
}) {}
