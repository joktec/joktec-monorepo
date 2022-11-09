import {
  JobMicroserviceConfig,
  JobMatchPageTestimonialMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobMatchPageTestimonialInput,
  JobMatchPageTestimonial,
  JobMatchPageTestimonialListResponse,
  JobMatchPageTestimonialQueryInput,
  UpdateJobMatchPageTestimonialInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobMatchPageTestimonial)
export class JobMatchPageTestimonialResolver extends BaseResolver<
  CreateJobMatchPageTestimonialInput,
  UpdateJobMatchPageTestimonialInput,
  JobMatchPageTestimonialQueryInput
>({
  viewDto: JobMatchPageTestimonial,
  createInput: CreateJobMatchPageTestimonialInput,
  updateInput: UpdateJobMatchPageTestimonialInput,
  listQueryInput: JobMatchPageTestimonialQueryInput,
  listViewDto: JobMatchPageTestimonialListResponse,
  name: 'jobMatchPageTestimonial',
  pluralName: 'jobMatchPageTestimonials',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobMatchPageTestimonialMessagePattern);
  }
}
