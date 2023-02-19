import { Field, ObjectType } from '@nestjs/graphql';
import { JobCity } from './job-city.typedef';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobDistrict extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  districtId!: string;

  @Field(() => String, {
    nullable: true,
  })
  code: string;

  @Field(() => String, {
    nullable: true,
  })
  cityId: string;

  @Field(() => Number, {
    nullable: true,
  })
  lon: number;

  @Field(() => Number, {
    nullable: true,
  })
  lat: number;

  @Field(() => String, {
    nullable: true,
  })
  lateUpdate: Date;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEng: string;
}

@ObjectType()
export class JobDistrictDetail extends JobDistrict {
  @Field(() => JobCity, {
    nullable: true,
  })
  city: JobCity;
}

@ObjectType()
export class JobDistrictListResponse extends BaseListResponse({
  viewDto: JobDistrict,
}) {}
