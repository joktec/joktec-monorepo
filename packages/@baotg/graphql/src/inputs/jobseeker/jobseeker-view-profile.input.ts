import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerViewProfileInput {
  @Field(() => String, {
    nullable: true,
  })
  viewerId!: string;

  @Field(() => String, {
    nullable: true,
  })
  viewerUsername!: string;

  @Field(() => String, {
    nullable: true,
  })
  profileId!: string;

  @Field(() => String, {
    nullable: true,
  })
  profileUsername!: string;

  @Field(() => Date, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  viewAt!: Date;
}

@InputType()
export class CreateJobSeekerViewProfileInput extends BaseJobSeekerViewProfileInput {}

@InputType()
export class UpdateJobSeekerViewProfileInput extends BaseJobSeekerViewProfileInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerViewProfilePaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerViewProfileConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerViewProfileQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerViewProfileConditionInput,
  paginationInput: JobSeekerViewProfilePaginationInput,
})<JobSeekerViewProfileConditionInput, JobSeekerViewProfilePaginationInput> {}
