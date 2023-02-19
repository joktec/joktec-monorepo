import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class CandidateLink extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  linkId!: string;

  @Field(() => String, {
    nullable: true,
  })
  candidateId!: string;

  @Field(() => String, {
    nullable: true,
  })
  createDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  name!: string;
}

@ObjectType()
export class CandidateLinkDetail extends CandidateLink {}

@ObjectType()
export class CandidateLinkListReponse extends BaseListResponse({
  viewDto: CandidateLink,
}) {}
