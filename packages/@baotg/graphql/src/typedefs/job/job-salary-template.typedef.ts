import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobSalaryTemplate extends BaseTypedef {
  @Field(() => String, { nullable: true })
  avgSalary: string;

  @Field(() => String, { nullable: true })
  experienceYear: string;

  @Field(() => String, { nullable: true })
  industry: string;

  @Field(() => String, { nullable: true })
  lastUpdate: Date;

  @Field(() => String, { nullable: true })
  maxSalary: string;

  @Field(() => String, { nullable: true })
  minSalary: string;

  @Field(() => String, { nullable: true })
  region: string;

  @Field(() => String, { nullable: true })
  title: string;
}

@ObjectType()
export class JobSalaryTemplateDetail extends JobSalaryTemplate {}

@ObjectType()
export class JobSalaryTemplateListResponse extends BaseListResponse({
  viewDto: JobSalaryTemplate,
}) {}
