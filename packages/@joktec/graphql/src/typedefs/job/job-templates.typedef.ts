import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobTemplates extends BaseTypedef {
  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String, { nullable: true })
  requirement: string;

  @Field(() => Number, { nullable: true })
  isActive: number;

  @Field(() => String, { nullable: true })
  createdBy: string;

  @Field(() => String, { nullable: true })
  updatedBy: string;

  @Field(() => String, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  levelId: string;

  @Field(() => Number, { nullable: true })
  industryId: number;

  @Field(() => String, { nullable: true })
  language: string;
}

@ObjectType()
export class JobTemplatesDetail extends JobTemplates {}

@ObjectType()
export class JobTemplatesListResponse extends BaseListResponse({
  viewDto: JobTemplates,
}) {}
