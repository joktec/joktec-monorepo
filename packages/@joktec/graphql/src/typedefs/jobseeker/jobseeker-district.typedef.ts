import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerDistrict extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  username!: string;

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
  districtId!: string;
}

@ObjectType()
export class JobSeekerDistrictDetail extends JobSeekerDistrict {}

@ObjectType()
export class JobSeekerDistrictListReponse extends BaseListResponse({
  viewDto: JobSeekerDistrict,
}) {}
