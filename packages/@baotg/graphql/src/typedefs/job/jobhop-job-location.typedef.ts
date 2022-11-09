import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobhopJobLocation extends BaseTypedef {
  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => Number, { nullable: true })
  locationId: number;
}

@ObjectType()
export class JobhopJobLocationDetail extends JobhopJobLocation {}

@ObjectType()
export class JobhopJobLocationListResponse extends BaseListResponse({
  viewDto: JobhopJobLocation,
}) {}
