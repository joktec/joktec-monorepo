import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class RecruiterCandidatestatusmessage extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  status!: string;

  @Field(() => String, {
    nullable: true,
  })
  vi!: string;

  @Field(() => String, {
    nullable: true,
  })
  en!: string;

  @Field(() => String, {
    nullable: true,
  })
  titleEn!: string;

  @Field(() => String, {
    nullable: true,
  })
  titleVi!: string;
}

@ObjectType()
export class RecruiterCandidatestatusmessageDetail extends RecruiterCandidatestatusmessage {}

@ObjectType()
export class RecruiterCandidatestatusmessageListReponse extends BaseListResponse({
  viewDto: RecruiterCandidatestatusmessage,
}) {}
