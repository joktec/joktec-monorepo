import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '@jobhopin/graphql';
import { CityTypedef } from '@app/modules/city/typedefs';

@ObjectType()
export class DistrictTypedef extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  code!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEng!: string;

  @Field(() => Number, {
    nullable: true,
  })
  lat!: number;

  @Field(() => Number, {
    nullable: true,
  })
  lon!: number;

  @Field(() => DistrictTypedef, {
    nullable: true,
  })
  parent!: DistrictTypedef;

  @Field(() => CityTypedef, {
    nullable: true,
  })
  city!: CityTypedef;
}

@ObjectType()
export class DistrictDetailTypedef extends DistrictTypedef {}

@ObjectType()
export class DistrictListResponseTypedef extends BaseListResponse({
  viewDto: DistrictTypedef,
}) {}
