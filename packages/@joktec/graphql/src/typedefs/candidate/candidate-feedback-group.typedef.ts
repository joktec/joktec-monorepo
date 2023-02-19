import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class CandidateFeedbackGroup extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;
}

@ObjectType()
export class CandidateFeedbackGroupDetail extends CandidateFeedbackGroup {}

@ObjectType()
export class CandidateFeedbackGroupListReponse extends BaseListResponse({
  viewDto: CandidateFeedbackGroup,
}) {}
