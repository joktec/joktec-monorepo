import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobFavoriteInput {
  @Field(() => Number, { nullable: true })
  favourite: number;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => Date, { nullable: true })
  lastUpdate: Date;

  @Field(() => String, { nullable: true })
  username: string;
}

@InputType()
export class CreateJobFavoriteInput extends BaseJobFavoriteInput {}

@InputType()
export class UpdateJobFavoriteInput extends BaseJobFavoriteInput {
  @Field()
  id!: string;
}

@InputType()
export class JobFavoritePaginationInput extends BasePaginationInput {}

@InputType()
export class JobFavoriteConditionInput extends BaseConditionInput {}

@InputType()
export class JobFavoriteQueryInput extends BaseQueryInput({
  conditionInput: JobFavoriteConditionInput,
  paginationInput: JobFavoritePaginationInput,
})<JobFavoriteConditionInput, JobFavoritePaginationInput> {}
