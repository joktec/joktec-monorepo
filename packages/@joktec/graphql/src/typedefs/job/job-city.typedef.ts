import { BaseListResponse, BaseTypedef } from '../base.typedef';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { JobCountry } from './job-country.typedef';

@ObjectType()
export class JobCity extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  cityId!: string;

  @Field(() => String, {
    nullable: true,
  })
  code: string;

  @Field(() => String, {
    nullable: true,
  })
  countryId: string;

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

  @Field(() => Int, {
    nullable: true,
  })
  priority: number;

  @Field(() => Int, {
    nullable: true,
  })
  enabled: number;

  @Field(() => String, {
    nullable: true,
  })
  image: string;

  @Field(() => String, {
    nullable: true,
  })
  imageHighlight: string;

  @Field(() => Number, {
    nullable: true,
  })
  prioritySearch: number;
}

@ObjectType()
export class JobCityDetail extends JobCity {
  @Field(() => JobCountry, {
    nullable: true,
  })
  country: JobCountry;
}

@ObjectType()
export class JobCityListResponse extends BaseListResponse({
  viewDto: JobCity,
}) {}
