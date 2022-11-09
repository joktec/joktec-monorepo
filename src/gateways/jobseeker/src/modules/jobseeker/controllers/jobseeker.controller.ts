import {
  BaseController,
  CreateJobSeekerInput,
  JobSeekerDto,
  JobSeekerListReponseDto,
  JobSeekerMessagePattern,
  JobseekerMicroserviceConfig,
  JobSeekerQueryInput,
  UpdateJobSeekerInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();

@Controller('jobseeker')
export class JobSeekerController extends BaseController<
  JobSeekerDto,
  CreateJobSeekerInput,
  UpdateJobSeekerInput,
  JobSeekerQueryInput,
  JobSeekerListReponseDto
> {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly JobSeekerMicroservice: ClientProxy,
  ) {
    super(JobSeekerMicroservice, JobSeekerMessagePattern);
  }
}
