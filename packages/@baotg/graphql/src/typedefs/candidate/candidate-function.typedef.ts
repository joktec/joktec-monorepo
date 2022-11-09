import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class CandidateFunction extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  candidateId!: string;

  @Field(() => String, {
    nullable: true,
  })
  functionId!: string;
}

@ObjectType()
export class CandidateFunctionDetail extends CandidateFunction {}

@ObjectType()
export class CandidateFunctionListReponse extends BaseListResponse({
  viewDto: CandidateFunction,
}) {}
