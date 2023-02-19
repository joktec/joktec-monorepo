import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobType extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  jobTypeId!: string;

  @Field(() => String, {
    nullable: true,
  })
  code: string;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEng: string;

  @Field(() => Number, {
    nullable: true,
  })
  priority: number;
}

@ObjectType()
export class JobTypeDetail extends JobType {}

@ObjectType()
export class JobTypeListResponse extends BaseListResponse({
  viewDto: JobType,
}) {}
