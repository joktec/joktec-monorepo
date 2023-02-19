import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class CvScore extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  score!: string;

  @Field(() => String, {
    nullable: true,
  })
  cvFile!: string;
}

@ObjectType()
export class CvScoreDetail extends CvScore {}

@ObjectType()
export class CvScoreListReponse extends BaseListResponse({
  viewDto: CvScore,
}) {}
