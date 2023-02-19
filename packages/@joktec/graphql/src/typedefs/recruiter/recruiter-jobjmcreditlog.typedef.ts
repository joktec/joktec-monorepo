import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class RecruiterJobjmcreditlog extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  creditBurned!: number;

  @Field(() => String, {
    nullable: true,
  })
  created!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updated!: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;
}

@ObjectType()
export class RecruiterJobjmcreditlogDetail extends RecruiterJobjmcreditlog {}

@ObjectType()
export class RecruiterJobjmcreditlogListReponse extends BaseListResponse({
  viewDto: RecruiterJobjmcreditlog,
}) {}
