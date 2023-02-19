import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobLink extends BaseTypedef {
  @Field(() => String, { nullable: true })
  createBy: string;

  @Field(() => String, { nullable: true })
  createDate: Date;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  lastUpdate: Date;

  @Field(() => String, { nullable: true })
  link: string;

  @Field(() => String, { nullable: true })
  updateBy: string;
}

@ObjectType()
export class JobLinkDetail extends JobLink {}

@ObjectType()
export class JobLinkListResponse extends BaseListResponse({
  viewDto: JobLink,
}) {}
