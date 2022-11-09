import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class Interview extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  interviewId: string;

  @Field(() => String, {
    nullable: true,
  })
  candidateId: string;

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
  interviewDate: Date;

  @Field(() => String, {
    nullable: true,
  })
  interviewEndTime: Date;

  @Field(() => String, {
    nullable: true,
  })
  interviewStartTime: Date;

  @Field(() => String, {
    nullable: true,
  })
  intervieweeEmail: string;

  @Field(() => String, {
    nullable: true,
  })
  intervieweeFullName: string;

  @Field(() => String, {
    nullable: true,
  })
  intervieweeId: string;

  @Field(() => String, {
    nullable: true,
  })
  lastUpdate: Date;

  @Field(() => String, {
    nullable: true,
  })
  location: string;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  notes: string;

  @Field(() => String, {
    nullable: true,
  })
  recruiterId: string;

  @Field(() => String, {
    nullable: true,
  })
  updateBy: string;

  @Field(() => String, {
    nullable: true,
  })
  interviewer: string;

  @Field(() => String, {
    nullable: true,
  })
  gCalendarEventId: string;

  @Field(() => Int, {
    nullable: true,
  })
  canceled: number;

  @Field(() => String, {
    nullable: true,
  })
  canceledAt: Date;

  @Field(() => Int, {
    nullable: true,
  })
  approved: number;

  @Field(() => String, {
    nullable: true,
  })
  approvedBy: string;

  @Field(() => String, {
    nullable: true,
  })
  approvedAt: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobId: string;

  @Field(() => Int, {
    nullable: true,
  })
  isRescheduled: number;

  @Field(() => Int, {
    nullable: true,
  })
  isSuccess: number;

  @Field(() => Int, {
    nullable: true,
  })
  status: number;

  @Field(() => Int, {
    nullable: true,
  })
  platform: number;
}

@ObjectType()
export class InterviewDetail extends Interview {}

@ObjectType()
export class InterviewListReponse extends BaseListResponse({
  viewDto: Interview,
}) {}
