import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobhopFptoLadiPageLog extends BaseTypedef {
  @Field(() => String, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  timestamp: string;

  @Field(() => String, { nullable: true })
  companyName: string;

  @Field(() => String, { nullable: true })
  companySize: string;

  @Field(() => String, { nullable: true })
  headCount: string;

  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  source: string;

  @Field(() => String, { nullable: true })
  fullName: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  phone: string;

  @Field(() => String, { nullable: true })
  suggestedPackage: string;

  @Field(() => Number, { nullable: true })
  success: number;

  @Field(() => String, { nullable: true })
  reason: string;
}

@ObjectType()
export class JobhoFptoLadiPageLogDetail extends JobhopFptoLadiPageLog {}

@ObjectType()
export class JobhopFptoLadiPageLogListResponse extends BaseListResponse({
  viewDto: JobhopFptoLadiPageLog,
}) {}
