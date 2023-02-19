import { GraphQLJSON } from 'graphql-type-json';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class CvTemplate extends BaseTypedef {
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
  linkThumbnail!: string;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  localizedName!: object;

  @Field(() => String, {
    nullable: true,
  })
  linkOriginal!: string;

  @Field(() => Int, {
    nullable: true,
  })
  priority!: number;

  @Field(() => String, {
    nullable: true,
  })
  nameEng!: string;
}

@ObjectType()
export class CvTemplatesDetail extends CvTemplate {}

@ObjectType()
export class CvTemplateListReponse extends BaseListResponse({
  viewDto: CvTemplate,
}) {}
