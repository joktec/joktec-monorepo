import { BaseListResponse } from '../base.typedef';
import { Field, ObjectType } from '@nestjs/graphql';

class LocationType {
  @Field(() => String, {
    nullable: true,
  })
  locationTypeId: string;

  @Field(() => Number, {
    nullable: true,
  })
  level: number;

  @Field(() => String, {
    nullable: true,
  })
  type: string;

  @Field(() => String, {
    nullable: true,
  })
  country: string;
}

@ObjectType()
export class JobLocation {
  @Field(() => String, {
    nullable: true,
  })
  locationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEn: string;

  @Field(() => String, {
    nullable: true,
  })
  shortName: string;

  @Field(() => String, {
    nullable: true,
  })
  shortNameEn: string;

  @Field(() => String, {
    nullable: true,
  })
  slug: string;

  @Field(() => String, {
    nullable: true,
  })
  image: string;

  @Field(() => String, {
    nullable: true,
  })
  imageHighLight: string;

  @Field(() => String, {
    nullable: true,
  })
  priority: string;

  @Field(() => String, {
    nullable: true,
  })
  locationTypeId: string;

  @Field(() => Number, {
    nullable: true,
  })
  parentId: number;

  @Field(() => String, {
    nullable: true,
  })
  imageKyc: string;

  @Field(() => Number, {
    nullable: true,
  })
  default_district: number;

  @Field(() => String, {
    nullable: true,
  })
  askLocationSelectionImage: string;

  @Field(() => Number, {
    nullable: true,
  })
  isActiveAskLocation: number;
}

@ObjectType()
export class JobLocationDetail extends JobLocation {
  @Field(() => LocationType, {
    nullable: true,
  })
  locationType: LocationType;
}

@ObjectType()
export class JobLocationListResponse extends BaseListResponse({
  viewDto: JobLocation,
}) {}
