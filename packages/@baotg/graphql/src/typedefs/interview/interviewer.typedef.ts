import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class Interviewer extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  interviewerId: string;

  @Field(() => String, {
    nullable: true,
  })
  avatar: string;

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
  email: string;

  @Field(() => String, {
    nullable: true,
  })
  fullName: string;

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
  username: string;
}

@ObjectType()
export class InterviewerDetail extends Interviewer {}

@ObjectType()
export class InterviewerListReponse extends BaseListResponse({
  viewDto: Interviewer,
}) {}
