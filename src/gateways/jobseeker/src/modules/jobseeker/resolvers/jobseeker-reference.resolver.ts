import { firstValueFrom } from 'rxjs';
import {
  JobSeekerReferenceMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerReferenceInput,
  UpdateJobSeekerReferenceInput,
  JobSeekerReferenceQueryInput,
  JobSeekerReferenceListReponse,
  JobSeekerReference,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerReference)
export class JobSeekerReferenceResolver extends BaseResolver<
  CreateJobSeekerReferenceInput,
  UpdateJobSeekerReferenceInput,
  JobSeekerReferenceQueryInput
>({
  viewDto: JobSeekerReference,
  createInput: CreateJobSeekerReferenceInput,
  updateInput: UpdateJobSeekerReferenceInput,
  listQueryInput: JobSeekerReferenceQueryInput,
  listViewDto: JobSeekerReferenceListReponse,
  name: 'jobSeekerReference',
  pluralName: 'jobSeekerReferences',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerReferenceMessagePattern);
  }
}
