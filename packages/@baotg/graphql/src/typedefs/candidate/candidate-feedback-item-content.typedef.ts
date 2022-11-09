import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class CandidateFeedbackItemContent extends BaseTypedef {
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
  candidatefeedbackitemId!: number;
}

@ObjectType()
export class CandidateFeedbackItemContentDetail extends CandidateFeedbackItemContent {}

@ObjectType()
export class CandidateFeedbackItemContentListReponse extends BaseListResponse({
  viewDto: CandidateFeedbackItemContent,
}) {}
