import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class CvIndustry extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updatedBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  industryId!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameIndustry!: string;
}

@ObjectType()
export class CvIndustryDetail extends CvIndustry {}

@ObjectType()
export class CvIndustryListReponse extends BaseListResponse({
  viewDto: CvIndustry,
}) {}
