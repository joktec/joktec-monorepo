import {
  JobMicroserviceConfig,
  JobhopUserJobSentreccMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobhopUserJobSentreccInput,
  JobhopUserJobSentrecc,
  JobhopUserJobSentreccListResponse,
  JobhopUserJobSentreccQueryInput,
  UpdateJobhopUserJobSentreccInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopUserJobSentrecc)
export class JobhopUserJobSentreccResolver extends BaseResolver<
  CreateJobhopUserJobSentreccInput,
  UpdateJobhopUserJobSentreccInput,
  JobhopUserJobSentreccQueryInput
>({
  viewDto: JobhopUserJobSentrecc,
  createInput: CreateJobhopUserJobSentreccInput,
  updateInput: UpdateJobhopUserJobSentreccInput,
  listQueryInput: JobhopUserJobSentreccQueryInput,
  listViewDto: JobhopUserJobSentreccListResponse,
  name: 'jobhopUserJobSentrecc',
  pluralName: 'jobhopUserJobSentrecces',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopUserJobSentreccMessagePattern);
  }
}
