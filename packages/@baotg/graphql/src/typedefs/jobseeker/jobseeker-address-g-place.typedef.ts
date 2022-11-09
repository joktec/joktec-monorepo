import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerAddressGPlace extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  country!: string;

  @Field(() => String, {
    nullable: true,
  })
  formattedAddress!: string;

  @Field(() => String, {
    nullable: true,
  })
  placeId!: string;

  @Field(() => String, {
    nullable: true,
  })
  administrativeAreaLevel1!: string;

  @Field(() => String, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updatedAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;

  @Field(() => String, {
    nullable: true,
  })
  countryShortCode!: string;
}

@ObjectType()
export class JobSeekerAddressGPlaceDetail extends JobSeekerAddressGPlace {}

@ObjectType()
export class JobSeekerAddressGPlaceListReponse extends BaseListResponse({
  viewDto: JobSeekerAddressGPlace,
}) {}
