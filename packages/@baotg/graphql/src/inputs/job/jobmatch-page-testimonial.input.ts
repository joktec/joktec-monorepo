import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobMatchPageTestimonialInput {
  @Field(() => String, {
    nullable: true,
  })
  avatar: string;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  page: string;
}

@InputType()
export class CreateJobMatchPageTestimonialInput extends BaseJobMatchPageTestimonialInput {}

@InputType()
export class UpdateJobMatchPageTestimonialInput extends BaseJobMatchPageTestimonialInput {
  @Field()
  id!: string;
}

@InputType()
export class JobMatchPageTestimonialPaginationInput extends BasePaginationInput {}

@InputType()
export class JobMatchPageTestimonialConditionInput extends BaseConditionInput {}

@InputType()
export class JobMatchPageTestimonialQueryInput extends BaseQueryInput({
  conditionInput: JobMatchPageTestimonialConditionInput,
  paginationInput: JobMatchPageTestimonialPaginationInput,
})<JobMatchPageTestimonialConditionInput, JobMatchPageTestimonialPaginationInput> {}
