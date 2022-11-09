import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerSegmentRoutine extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  routineName!: string;

  @Field(() => String, {
    nullable: true,
  })
  templateOrder!: string;

  @Field(() => Int, {
    nullable: true,
  })
  isActive!: number;

  @Field(() => Int, {
    nullable: true,
  })
  isDefault!: number;

  @Field(() => String, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updatedAt!: Date;
}

@ObjectType()
export class JobSeekerSegmentRoutineDetail extends JobSeekerSegmentRoutine {}

@ObjectType()
export class JobSeekerSegmentRoutineListReponse extends BaseListResponse({
  viewDto: JobSeekerSegmentRoutine,
}) {}
