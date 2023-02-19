import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerJobFunction extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  createDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobFunction!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;
}

@ObjectType()
export class JobSeekerJobFunctionDetail extends JobSeekerJobFunction {}

@ObjectType()
export class JobSeekerJobFunctionListReponse extends BaseListResponse({
  viewDto: JobSeekerJobFunction,
}) {}
