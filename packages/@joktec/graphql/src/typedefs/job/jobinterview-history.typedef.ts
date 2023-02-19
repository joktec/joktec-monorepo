import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobInterviewHistory extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  created: Date;

  @Field(() => String, {
    nullable: true,
  })
  updated: Date;

  @Field(() => String, {
    nullable: true,
  })
  action: string;

  @Field(() => Int, {
    nullable: true,
  })
  jobinterviewId: number;

  @Field(() => String, {
    nullable: true,
  })
  user: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationName: string;

  @Field(() => String, {
    nullable: true,
  })
  candidateId: string;
}

@ObjectType()
export class JobInterviewHistoryDetail extends JobInterviewHistory {}

@ObjectType()
export class JobInterviewHistoryListResponse extends BaseListResponse({
  viewDto: JobInterviewHistory,
}) {}
