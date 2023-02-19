import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerLanguage extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  language!: string;

  @Field(() => String, {
    nullable: true,
  })
  level!: string;

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
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updateBy!: string;
}

@ObjectType()
export class JobSeekerLanguageDetail extends JobSeekerLanguage {}

@ObjectType()
export class JobSeekerLanguageListReponse extends BaseListResponse({
  viewDto: JobSeekerLanguage,
}) {}
