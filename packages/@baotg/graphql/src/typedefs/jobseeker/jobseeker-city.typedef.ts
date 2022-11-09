import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerCity extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  username!: string;

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
}

@ObjectType()
export class JobSeekerCityDetail extends JobSeekerCity {}

@ObjectType()
export class JobSeekerCityListReponse extends BaseListResponse({
  viewDto: JobSeekerCity,
}) {}
