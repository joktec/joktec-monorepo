import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class CandidateFeedbackItem extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  level!: number;

  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  inputType!: string;

  @Field(() => Int, {
    nullable: true,
  })
  groupId!: number;

  @Field(() => Int, {
    nullable: true,
  })
  parentId!: number;
}

@ObjectType()
export class CandidateFeedbackItemDetail extends CandidateFeedbackItem {}

@ObjectType()
export class CandidateFeedbackItemListReponse extends BaseListResponse({
  viewDto: CandidateFeedbackItem,
}) {}
