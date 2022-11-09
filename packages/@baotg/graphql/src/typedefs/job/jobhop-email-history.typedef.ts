import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobhopEmailHistory extends BaseTypedef {
  @Field(() => String, { nullable: true })
  created: Date;

  @Field(() => String, { nullable: true })
  updated: Date;

  @Field(() => String, { nullable: true })
  interviewerEmail: string;

  @Field(() => String, { nullable: true })
  candidateEmail: string;

  @Field(() => String, { nullable: true })
  subject: string;
}

@ObjectType()
export class JobhopEmailHistoryDetail extends JobhopEmailHistory {}

@ObjectType()
export class JobhopEmailHistoryListResponse extends BaseListResponse({
  viewDto: JobhopEmailHistory,
}) {}
