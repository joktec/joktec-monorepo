import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class CandidateLocation extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  candidateId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  locationId!: number;
}

@ObjectType()
export class CandidateLocationDetail extends CandidateLocation {}

@ObjectType()
export class CandidateLocationListReponse extends BaseListResponse({
  viewDto: CandidateLocation,
}) {}
