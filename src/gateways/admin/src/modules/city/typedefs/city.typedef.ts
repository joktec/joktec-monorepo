import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '@baotg/graphql';
import { CountryTypedef } from '@app/modules/country/typedefs';

@ObjectType()
export class CityTypedef extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  code!: string;

  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEng!: string;

  @Field(() => CountryTypedef, {
    nullable: true,
  })
  country!: CountryTypedef;

  @Field(() => Number, {
    nullable: true,
  })
  priority!: number;

  @Field(() => Number, {
    nullable: true,
  })
  prioritySearch!: number;

  @Field(() => Number, {
    nullable: true,
  })
  enabled!: number;

  @Field(() => String, {
    nullable: true,
  })
  image!: string;

  @Field(() => String, {
    nullable: true,
  })
  imageHighlight!: string;
}

@ObjectType()
export class CityDetailTypedef extends CityTypedef {}

@ObjectType()
export class CityListResponseTypedef extends BaseListResponse({
  viewDto: CityTypedef,
}) {}
