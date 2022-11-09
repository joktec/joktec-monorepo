import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '@jobhopin/graphql';

@ObjectType()
export class CountryTypedef extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEng!: string;

  @Field(() => String, {
    nullable: true,
  })
  code!: string;
}

@ObjectType()
export class CountryDetailTypedef extends CountryTypedef {}

@ObjectType()
export class CountryListResponseTypedef extends BaseListResponse({
  viewDto: CountryTypedef,
}) {}
