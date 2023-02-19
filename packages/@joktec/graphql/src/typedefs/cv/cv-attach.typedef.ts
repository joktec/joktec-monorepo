import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class CvAttach extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  contentType!: string;

  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  fileSize!: string;

  @Field(() => String, {
    nullable: true,
  })
  link!: string;

  @Field(() => String, {
    nullable: true,
  })
  name!: string;

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
export class CvAttachDetail extends CvAttach {}

@ObjectType()
export class CvAttachListReponse extends BaseListResponse({
  viewDto: CvAttach,
}) {}
