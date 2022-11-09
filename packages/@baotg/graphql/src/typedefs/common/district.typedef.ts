import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '../base.typedef';
import { City } from './city.typedef';

@ObjectType()
export class MiscJobDistrict extends BaseTypedef {
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
export class MiscJobDistrictDetail extends MiscJobDistrict {
  @Field(() => City, {
    nullable: true,
  })
  city: City;
}

@ObjectType()
export class MiscJobDistrictListResponse extends BaseListResponse({
  viewDto: MiscJobDistrict,
}) {}
