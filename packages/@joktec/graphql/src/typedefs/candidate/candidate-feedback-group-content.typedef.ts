import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class CandidateFeedbackGroupContent extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  lang!: string;

  @Field(() => String, {
    nullable: true,
  })
  title!: string;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  items!: object;

  @Field(() => Int, {
    nullable: true,
  })
  candidatefeedbackgroupId!: number;
}

@ObjectType()
export class CandidateFeedbackGroupContentDetail extends CandidateFeedbackGroupContent {}

@ObjectType()
export class CandidateFeedbackGroupContentListReponse extends BaseListResponse({
  viewDto: CandidateFeedbackGroupContent,
}) {}
