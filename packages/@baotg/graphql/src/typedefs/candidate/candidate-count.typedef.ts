import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CandidateCount {
  @Field(() => Number, {
    nullable: true,
  })
  all!: number;

  @Field(() => Number, {
    nullable: true,
  })
  hired!: number;

  @Field(() => Number, {
    nullable: true,
  })
  interviewing!: number;

  @Field(() => Number, {
    nullable: true,
  })
  new!: number;

  @Field(() => Number, {
    nullable: true,
  })
  offered!: number;

  @Field(() => Number, {
    nullable: true,
  })
  probation!: number;

  @Field(() => Number, {
    nullable: true,
  })
  rejected!: number;

  @Field(() => Number, {
    nullable: true,
  })
  screening!: number;

  @Field(() => Number, {
    nullable: true,
  })
  withdrew!: number;
}
