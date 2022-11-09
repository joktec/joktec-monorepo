import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class CandidatePerferenceHistory extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobName!: string;

  @Field(() => String, {
    nullable: true,
  })
  user!: string;

  @Field(() => String, {
    nullable: true,
  })
  action!: string;
}

@ObjectType()
export class CandidatePerferenceHistoryDetail extends CandidatePerferenceHistory {}

@ObjectType()
export class CandidatePerferenceHistoryListReponse extends BaseListResponse({
  viewDto: CandidatePerferenceHistory,
}) {}
