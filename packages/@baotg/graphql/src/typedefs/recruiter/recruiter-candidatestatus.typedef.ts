import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class RecruiterCandidatestatus extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  status!: string;

  @Field(() => String, {
    nullable: true,
  })
  created!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updated!: Date;

  @Field(() => String, {
    nullable: true,
  })
  notes!: string;

  @Field(() => String, {
    nullable: true,
  })
  candidateId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  acceptInterview!: number;

  @Field(() => String, {
    nullable: true,
  })
  interviewId!: string;
}

@ObjectType()
export class RecruiterCandidatestatusDetail extends RecruiterCandidatestatus {}

@ObjectType()
export class RecruiterCandidatestatusListReponse extends BaseListResponse({
  viewDto: RecruiterCandidatestatus,
}) {}
