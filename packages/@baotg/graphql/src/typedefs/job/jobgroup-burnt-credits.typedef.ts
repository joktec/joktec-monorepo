import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobGroupBurntCredits extends BaseTypedef {
  @Field(() => String, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  cvId: string;

  @Field(() => String, { nullable: true })
  email: string;
}

@ObjectType()
export class JobGroupBurntCreditsDetail extends JobGroupBurntCredits {}

@ObjectType()
export class JobGroupBurntCreditsListResponse extends BaseListResponse({
  viewDto: JobGroupBurntCredits,
}) {}
