import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobFavorite extends BaseTypedef {
  @Field(() => Number, { nullable: true })
  favourite: number;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  lastUpdate: Date;

  @Field(() => String, { nullable: true })
  username: string;
}

@ObjectType()
export class JobFavoriteDetail extends JobFavorite {}

@ObjectType()
export class JobFavoriteListResponse extends BaseListResponse({
  viewDto: JobFavorite,
}) {}
