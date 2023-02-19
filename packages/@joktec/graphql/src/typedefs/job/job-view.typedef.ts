import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobView extends BaseTypedef {
  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  createDate: Date;

  @Field(() => Number, { nullable: true })
  numViews: number;

  @Field(() => String, { nullable: true })
  timeViews: Date;
}

@ObjectType()
export class JobViewDetail extends JobView {}

@ObjectType()
export class JobViewListResponse extends BaseListResponse({
  viewDto: JobView,
}) {}
