import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class CandidateAttach extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  candidateId!: string;

  @Field(() => String, {
    nullable: true,
  })
  contentType!: string;

  @Field(() => Int, {
    nullable: true,
  })
  fileSize!: number;

  @Field(() => String, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  link!: string;

  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => Int, {
    nullable: true,
  })
  deleted!: number;

  @Field(() => String, {
    nullable: true,
  })
  oldCandidateId!: string;
}

@ObjectType()
export class CandidateAttachDetail extends CandidateAttach {}

@ObjectType()
export class CandidateAttachListReponse extends BaseListResponse({
  viewDto: CandidateAttach,
}) {}
