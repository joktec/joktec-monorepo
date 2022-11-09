import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerWorkExperience extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  company!: string;

  @Field(() => String, {
    nullable: true,
  })
  detail!: string;

  @Field(() => String, {
    nullable: true,
  })
  position!: string;

  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => Int, {
    nullable: true,
  })
  deleted!: number;

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
  endDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  startDate!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  stillWorking!: number;

  @Field(() => String, {
    nullable: true,
  })
  updateBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  industryId!: string;

  @Field(() => String, {
    nullable: true,
  })
  levelId!: string;

  @Field(() => String, {
    nullable: true,
  })
  yearExp!: string;

  @Field(() => String, {
    nullable: true,
  })
  positionDetail!: string;
}

@ObjectType()
export class JobSeekerWorkExperienceDetail extends JobSeekerWorkExperience {}

@ObjectType()
export class JobSeekerWorkExperienceListReponse extends BaseListResponse({
  viewDto: JobSeekerWorkExperience,
}) {}
