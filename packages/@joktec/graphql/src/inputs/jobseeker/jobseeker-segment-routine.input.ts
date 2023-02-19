import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerSegmentRoutineInput {
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

  @Field(() => Date, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  updatedAt!: Date;
}

@InputType()
export class CreateJobSeekerSegmentRoutineInput extends BaseJobSeekerSegmentRoutineInput {}

@InputType()
export class UpdateJobSeekerSegmentRoutineInput extends BaseJobSeekerSegmentRoutineInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerSegmentRoutinePaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerSegmentRoutineConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerSegmentRoutineQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerSegmentRoutineConditionInput,
  paginationInput: JobSeekerSegmentRoutinePaginationInput,
})<JobSeekerSegmentRoutineConditionInput, JobSeekerSegmentRoutinePaginationInput> {}
