import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class CandidateCompanyType extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  candidateId!: string;

  @Field(() => String, {
    nullable: true,
  })
  companyTypeId!: string;
}

@ObjectType()
export class CandidateCompanyTypeDetail extends CandidateCompanyType {}

@ObjectType()
export class CandidateCompanyTypeListReponse extends BaseListResponse({
  viewDto: CandidateCompanyType,
}) {}
