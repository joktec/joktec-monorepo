import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobMatch extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  cos: number;

  @Field(() => String, {
    nullable: true,
  })
  createBy: string;

  @Field(() => String, {
    nullable: true,
  })
  createDate: Date;

  @Field(() => String, {
    nullable: true,
  })
  cvId: string;

  @Field(() => String, {
    nullable: true,
  })
  jobId: string;

  @Field(() => String, {
    nullable: true,
  })
  referralId: string;

  @Field(() => String, {
    nullable: true,
  })
  lastUpdate: Date;

  @Field(() => String, {
    nullable: true,
  })
  updateBy: string;

  @Field(() => String, {
    nullable: true,
  })
  applyBy: string;

  @Field(() => String, {
    nullable: true,
  })
  applyType: string;

  @Field(() => Int, {
    nullable: true,
  })
  platform: number;

  @Field(() => String, {
    nullable: true,
  })
  response: string;
}

@ObjectType()
export class JobMatchDetail extends JobMatch {}

@ObjectType()
export class JobMatchListResponse extends BaseListResponse({
  viewDto: JobMatch,
}) {}
