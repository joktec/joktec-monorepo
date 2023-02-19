import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobMatchPageVideoLinkInput {
  @Field(() => String, {
    nullable: true,
  })
  link: string;

  @Field(() => String, {
    nullable: true,
  })
  page: string;
}

@InputType()
export class CreateJobMatchPageVideoLinkInput extends BaseJobMatchPageVideoLinkInput {}

@InputType()
export class UpdateJobMatchPageVideoLinkInput extends BaseJobMatchPageVideoLinkInput {
  @Field()
  id!: string;
}

@InputType()
export class JobMatchPageVideoLinkPaginationInput extends BasePaginationInput {}

@InputType()
export class JobMatchPageVideoLinkConditionInput extends BaseConditionInput {}

@InputType()
export class JobMatchPageVideoLinkQueryInput extends BaseQueryInput({
  conditionInput: JobMatchPageVideoLinkConditionInput,
  paginationInput: JobMatchPageVideoLinkPaginationInput,
})<JobMatchPageVideoLinkConditionInput, JobMatchPageVideoLinkPaginationInput> {}
