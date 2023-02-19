import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobViewRaw extends BaseTypedef {
  @Field(() => Number, { nullable: true })
  viewId: number;

  @Field(() => String, { nullable: true })
  createDate: Date;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  userId: string;
}

@ObjectType()
export class JobViewRawDetail extends JobViewRaw {}

@ObjectType()
export class JobViewRawListResponse extends BaseListResponse({
  viewDto: JobViewRaw,
}) {}
