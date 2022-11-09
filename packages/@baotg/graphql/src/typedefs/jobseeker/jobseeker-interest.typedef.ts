import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerInterest extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  interest!: string;

  @Field(() => String, {
    nullable: true,
  })
  updateBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  createBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  createDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;
}

@ObjectType()
export class JobSeekerInterestDetail extends JobSeekerInterest {}

@ObjectType()
export class JobSeekerInterestListReponse extends BaseListResponse({
  viewDto: JobSeekerInterest,
}) {}
