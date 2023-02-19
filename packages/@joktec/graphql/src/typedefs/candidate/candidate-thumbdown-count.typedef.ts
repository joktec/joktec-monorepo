import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class CandidateThumbdownCount extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  tickOn!: number;

  @Field(() => String, {
    nullable: true,
  })
  candidateId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;

  @Field(() => String, {
    nullable: true,
  })
  userId!: string;
}

@ObjectType()
export class CandidateThumbdownCountDetail extends CandidateThumbdownCount {}

@ObjectType()
export class CandidateThumbdownCountListReponse extends BaseListResponse({
  viewDto: CandidateThumbdownCount,
}) {}
