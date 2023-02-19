import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class MarketValueInstructionFeedback extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  isHelpful!: number;

  @Field(() => String, {
    nullable: true,
  })
  unhelpfulReason!: string;

  @Field(() => String, {
    nullable: true,
  })
  feedback!: string;
}

@ObjectType()
export class MarketValueInstructionFeedbackDetail extends MarketValueInstructionFeedback {}

@ObjectType()
export class MarketValueInstructionFeedbackListReponse extends BaseListResponse({
  viewDto: MarketValueInstructionFeedback,
}) {}
