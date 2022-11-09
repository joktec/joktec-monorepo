import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { BaseListResponse } from '../base.typedef';

@ObjectType()
class OptionTypedef {
  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  localizedName!: object;

  @Field(() => Number, {
    nullable: true,
  })
  priority: number;

  @Field(() => String, {
    nullable: true,
  })
  value: string;

  @Field(() => Boolean, {
    nullable: true,
  })
  isDefault: boolean;
}

@ObjectType()
export class InterviewReviewFilter {
  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEn: string;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  localizedName!: object;

  @Field(() => String, {
    nullable: true,
  })
  paramKey: string;

  @Field(() => Number, {
    nullable: true,
  })
  priority: number;

  @Field(() => Boolean, {
    nullable: true,
  })
  isMultiple: boolean;

  @Field(() => [OptionTypedef], {
    nullable: true,
  })
  options: OptionTypedef[];
}

@ObjectType()
export class InterviewReviewFilterDetail extends InterviewReviewFilter {}

@ObjectType()
export class InterviewReviewFilterListResponse extends BaseListResponse({
  viewDto: InterviewReviewFilter,
}) {}
