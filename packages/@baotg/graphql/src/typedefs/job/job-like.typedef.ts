import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobLike extends BaseTypedef {
  @Field(() => Number, { nullable: true })
  like: number;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  lastUpdate: Date;

  @Field(() => String, { nullable: true })
  username: string;
}

@ObjectType()
export class JobLikeDetail extends JobLike {}

@ObjectType()
export class JobLikeListResponse extends BaseListResponse({
  viewDto: JobLike,
}) {}
