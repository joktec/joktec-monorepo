import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class CvLink extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  createdDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  link!: string;

  @Field(() => String, {
    nullable: true,
  })
  cvFile!: string;

  @Field(() => Int, {
    nullable: true,
  })
  fileSize!: number;

  @Field(() => String, {
    nullable: true,
  })
  fileName!: string;

  @Field(() => String, {
    nullable: true,
  })
  contentType!: string;

  @Field(() => String, {
    nullable: true,
  })
  source!: string;
}

@ObjectType()
export class CvLinkDetail extends CvLink {}

@ObjectType()
export class CvLinkListReponse extends BaseListResponse({
  viewDto: CvLink,
}) {}
