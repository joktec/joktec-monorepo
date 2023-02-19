import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerCrawler extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  email!: string;

  @Field(() => Int, {
    nullable: true,
  })
  source!: number;

  @Field(() => String, {
    nullable: true,
  })
  crawlerId!: string;

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
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  phoneNumber!: string;

  @Field(() => String, {
    nullable: true,
  })
  updateBy!: string;
}

@ObjectType()
export class JobSeekerCrawlerDetail extends JobSeekerCrawler {}

@ObjectType()
export class JobSeekerCrawlerListReponse extends BaseListResponse({
  viewDto: JobSeekerCrawler,
}) {}
