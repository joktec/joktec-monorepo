import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class CandidateIndustry extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  candidateId!: string;

  @Field(() => String, {
    nullable: true,
  })
  industryId!: string;
}

@ObjectType()
export class CandidateIndustryDetail extends CandidateIndustry {}

@ObjectType()
export class CandidateIndustryListReponse extends BaseListResponse({
  viewDto: CandidateIndustry,
}) {}
