import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobCountry extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  countryId!: string;

  @Field(() => String, {
    nullable: true,
  })
  code: string;

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
export class JobCountryDetail extends JobCountry {}

@ObjectType()
export class JobCountryListResponse extends BaseListResponse({
  viewDto: JobCountry,
}) {}
