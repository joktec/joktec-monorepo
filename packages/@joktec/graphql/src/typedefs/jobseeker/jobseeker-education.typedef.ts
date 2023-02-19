import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerEducation extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  college!: string;

  @Field(() => Int, {
    nullable: true,
  })
  deleted!: number;

  @Field(() => String, {
    nullable: true,
  })
  detail!: string;

  @Field(() => String, {
    nullable: true,
  })
  major!: string;

  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => Int, {
    nullable: true,
  })
  GPA!: number;

  @Field(() => String, {
    nullable: true,
  })
  cityId!: string;

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
  degreeId!: string;

  @Field(() => String, {
    nullable: true,
  })
  endDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  startDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updateBy!: string;

  @Field(() => Int, {
    nullable: true,
  })
  stillStudying!: number;

  @Field(() => String, {
    nullable: true,
  })
  gpaExtra!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;
}

@ObjectType()
export class JobSeekerEducationDetail extends JobSeekerEducation {}

@ObjectType()
export class JobSeekerEducationListReponse extends BaseListResponse({
  viewDto: JobSeekerEducation,
}) {}
