import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerDirectlyApply extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  applyDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  createDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  hopScore!: number;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobVersionId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jsId!: string;

  @Field(() => String, {
    nullable: true,
  })
  applyBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  applyType!: string;
}

@ObjectType()
export class JobSeekerDirectlyApplyDetail extends JobSeekerDirectlyApply {}

@ObjectType()
export class JobSeekerDirectlyApplyListReponse extends BaseListResponse({
  viewDto: JobSeekerDirectlyApply,
}) {}
