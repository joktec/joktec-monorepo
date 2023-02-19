import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class QuizzQuestionMedia extends BaseTypedef {
  @Field(() => String, {
    nullable: false,
  })
  image!: string;

  @Field(() => String, {
    nullable: false,
  })
  video!: string;

  @Field(() => String, {
    nullable: false,
  })
  mediaType!: string;

  @Field(() => String, {
    nullable: false,
  })
  question!: string;
}

@ObjectType()
export class QuizzQuestionMediaDetail extends QuizzQuestionMedia {}

@ObjectType()
export class QuizzQuestionMediaListReponse extends BaseListResponse({
  viewDto: QuizzQuestionMedia,
}) {}
