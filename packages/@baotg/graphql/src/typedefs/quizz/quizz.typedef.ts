import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';
import { QuizzCategory } from './quizz-category.typedef';

@ObjectType()
export class Quizz extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameVi!: string;

  @Field(() => String, {
    nullable: true,
  })
  description!: string;

  @Field(() => String, {
    nullable: true,
  })
  descriptionVi!: string;

  @Field(() => Int, {
    nullable: true,
  })
  numberOfVisitor!: number;

  @Field(() => Int, {
    nullable: true,
  })
  numberOfPlayer!: number;

  @Field(() => Int, {
    nullable: true,
  })
  numberOfVote!: number;

  @Field(() => Int, {
    nullable: true,
  })
  upvotePercent!: number;

  @Field(() => String, {
    nullable: true,
  })
  logo!: string;

  @Field(() => String, {
    nullable: true,
  })
  banner!: string;

  @Field(() => QuizzCategory, {
    nullable: true,
  })
  category!: QuizzCategory;

  @Field(() => String, {
    nullable: true,
  })
  organization!: string;

  @Field(() => String, {
    nullable: true,
  })
  level!: string;

  @Field(() => Int, {
    nullable: true,
  })
  duration!: number;

  @Field(() => String, {
    nullable: true,
  })
  type!: string;

  @Field(() => String, {
    nullable: true,
  })
  tags!: string;

  @Field(() => Int, {
    nullable: true,
  })
  numberOfQuestions!: number;

  @Field(() => String, {
    nullable: true,
  })
  whitelist!: string;

  @Field(() => String, {
    nullable: true,
  })
  mode!: string;

  @Field(() => Int, {
    nullable: true,
  })
  isFreeToPlay!: number;

  @Field(() => Int, {
    nullable: true,
  })
  hideResults!: number;

  @Field(() => String, {
    nullable: true,
  })
  eventTag!: string;

  @Field(() => String, {
    nullable: true,
  })
  language!: string;
}

@ObjectType()
export class QuizzDetail extends Quizz {}

@ObjectType()
export class QuizzListReponse extends BaseListResponse({
  viewDto: Quizz,
}) {}
