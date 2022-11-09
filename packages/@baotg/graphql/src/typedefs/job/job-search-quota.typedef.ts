import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobSearchQuota extends BaseTypedef {
  @Field(() => String, { nullable: true })
  jsId: string;

  @Field(() => Number, { nullable: true })
  isGuest: number;

  @Field(() => Number, { nullable: true })
  credits: number;

  @Field(() => String, { nullable: true })
  fulPath: string;

  @Field(() => String, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  updatedAt: Date;
}

@ObjectType()
export class JobSearchQuotaDetail extends JobSearchQuota {}

@ObjectType()
export class JobSearchQuotaListResponse extends BaseListResponse({
  viewDto: JobSearchQuota,
}) {}
