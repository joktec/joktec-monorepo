import { firstValueFrom } from 'rxjs';
import {
  JobSeekerVerifyAccountFileMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerVerifyAccountFileInput,
  UpdateJobSeekerVerifyAccountFileInput,
  JobSeekerVerifyAccountFileQueryInput,
  JobSeekerVerifyAccountFileListReponse,
  JobSeekerVerifyAccountFile,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerVerifyAccountFile)
export class JobSeekerVerifyAccountFileResolver extends BaseResolver<
  CreateJobSeekerVerifyAccountFileInput,
  UpdateJobSeekerVerifyAccountFileInput,
  JobSeekerVerifyAccountFileQueryInput
>({
  viewDto: JobSeekerVerifyAccountFile,
  createInput: CreateJobSeekerVerifyAccountFileInput,
  updateInput: UpdateJobSeekerVerifyAccountFileInput,
  listQueryInput: JobSeekerVerifyAccountFileQueryInput,
  listViewDto: JobSeekerVerifyAccountFileListReponse,
  name: 'jobSeekerVerifyAccountFile',
  pluralName: 'jobSeekerVerifyAccountFiles',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerVerifyAccountFileMessagePattern);
  }
}
