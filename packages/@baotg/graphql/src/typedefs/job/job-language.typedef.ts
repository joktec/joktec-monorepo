import { BaseListResponse, BaseTypedef } from '../base.typedef';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobLanguage extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  languageId!: string;

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

  @Field(() => Int, {
    nullable: true,
  })
  priority: number;

  @Field(() => String, {
    nullable: true,
  })
  lang: string;
}

@ObjectType()
export class JobLanguageDetail extends JobLanguage {}

@ObjectType()
export class JobLanguageListResponse extends BaseListResponse({
  viewDto: JobLanguage,
}) {}
