import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class QuizzCategory extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameVi!: string;
}

@ObjectType()
export class QuizzCategoryDetail extends QuizzCategory {}

@ObjectType()
export class QuizzCategoryListReponse extends BaseListResponse({
  viewDto: QuizzCategory,
}) {}
