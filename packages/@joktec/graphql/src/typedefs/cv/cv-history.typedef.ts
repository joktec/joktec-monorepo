import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class CvHistory extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  source!: string;

  @Field(() => String, {
    nullable: true,
  })
  modifierId!: string;

  @Field(() => String, {
    nullable: true,
  })
  modifierUsername!: string;

  @Field(() => String, {
    nullable: true,
  })
  data!: string;

  @Field(() => String, {
    nullable: true,
  })
  preData!: string;
}

@ObjectType()
export class CvHistoryDetail extends CvHistory {}

@ObjectType()
export class CvHistoryListReponse extends BaseListResponse({
  viewDto: CvHistory,
}) {}
