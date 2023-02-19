import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobhopJobMatchCounter extends BaseTypedef {
  @Field(() => Number, { nullable: true })
  recuiterCount: number;

  @Field(() => Number, { nullable: true })
  candidateCount: number;

  @Field(() => String, { nullable: true })
  created: Date;

  @Field(() => String, { nullable: true })
  update: Date;
}

@ObjectType()
export class JobhopJobMatchCounterDetail extends JobhopJobMatchCounter {}

@ObjectType()
export class JobhopJobMatchCounterListResponse extends BaseListResponse({
  viewDto: JobhopJobMatchCounter,
}) {}
