import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobMatchPageTestimonialContentInput {
  @Field(() => String, {
    nullable: true,
  })
  lang: string;

  @Field(() => String, {
    nullable: true,
  })
  jobTitle: string;

  @Field(() => String, {
    nullable: true,
  })
  content: string;

  @Field(() => String, {
    nullable: true,
  })
  testimonialId: number;
}

@InputType()
export class CreateJobMatchPageTestimonialContentInput extends BaseJobMatchPageTestimonialContentInput {}

@InputType()
export class UpdateJobMatchPageTestimonialContentInput extends BaseJobMatchPageTestimonialContentInput {
  @Field()
  id!: string;
}

@InputType()
export class JobMatchPageTestimonialContentPaginationInput extends BasePaginationInput {}

@InputType()
export class JobMatchPageTestimonialContentConditionInput extends BaseConditionInput {}

@InputType()
export class JobMatchPageTestimonialContentQueryInput extends BaseQueryInput({
  conditionInput: JobMatchPageTestimonialContentConditionInput,
  paginationInput: JobMatchPageTestimonialContentPaginationInput,
})<JobMatchPageTestimonialContentConditionInput, JobMatchPageTestimonialContentPaginationInput> {}
