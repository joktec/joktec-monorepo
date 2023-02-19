import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class RecruiterJobjmcreditplan extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => Int, {
    nullable: true,
  })
  weeklyProcessedCv!: number;

  @Field(() => Int, {
    nullable: true,
  })
  dailyImporession!: string;
}

@ObjectType()
export class RecruiterJobjmcreditplanDetail extends RecruiterJobjmcreditplan {}

@ObjectType()
export class RecruiterJobjmcreditplanListReponse extends BaseListResponse({
  viewDto: RecruiterJobjmcreditplan,
}) {}
