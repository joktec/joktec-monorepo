import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerIndustry extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => String, {
    nullable: true,
  })
  createBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  createDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  industryId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;
}

@ObjectType()
export class JobSeekerIndustryDetail extends JobSeekerIndustry {}

@ObjectType()
export class JobSeekerIndustryListReponse extends BaseListResponse({
  viewDto: JobSeekerIndustry,
}) {}
