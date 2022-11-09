import {
  JobMicroserviceConfig,
  JobMatchPageTestimonialContentMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobMatchPageTestimonialContentInput,
  JobMatchPageTestimonialContent,
  JobMatchPageTestimonialContentListResponse,
  JobMatchPageTestimonialContentQueryInput,
  UpdateJobMatchPageTestimonialContentInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobMatchPageTestimonialContent)
export class JobMatchPageTestimonialContentResolver extends BaseResolver<
  CreateJobMatchPageTestimonialContentInput,
  UpdateJobMatchPageTestimonialContentInput,
  JobMatchPageTestimonialContentQueryInput
>({
  viewDto: JobMatchPageTestimonialContent,
  createInput: CreateJobMatchPageTestimonialContentInput,
  updateInput: UpdateJobMatchPageTestimonialContentInput,
  listQueryInput: JobMatchPageTestimonialContentQueryInput,
  listViewDto: JobMatchPageTestimonialContentListResponse,
  name: 'jobMatchPageTestimonialContent',
  pluralName: 'jobMatchPageTestimonialContents',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobMatchPageTestimonialContentMessagePattern);
  }
}
