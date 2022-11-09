import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobhopJobDefaultImage extends BaseTypedef {
  @Field(() => String, { nullable: true })
  image: string;
}

@ObjectType()
export class JobhopJobDefaultImageDetail extends JobhopJobDefaultImage {}

@ObjectType()
export class JobhopJobDefaultImageListResponse extends BaseListResponse({
  viewDto: JobhopJobDefaultImage,
}) {}
