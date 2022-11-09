import { firstValueFrom } from 'rxjs';
import {
  JobSeekerSegmentRoutineMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerSegmentRoutineInput,
  UpdateJobSeekerSegmentRoutineInput,
  JobSeekerSegmentRoutineQueryInput,
  JobSeekerSegmentRoutineListReponse,
  JobSeekerSegmentRoutine,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerSegmentRoutine)
export class JobSeekerSegmentRoutineResolver extends BaseResolver<
  CreateJobSeekerSegmentRoutineInput,
  UpdateJobSeekerSegmentRoutineInput,
  JobSeekerSegmentRoutineQueryInput
>({
  viewDto: JobSeekerSegmentRoutine,
  createInput: CreateJobSeekerSegmentRoutineInput,
  updateInput: UpdateJobSeekerSegmentRoutineInput,
  listQueryInput: JobSeekerSegmentRoutineQueryInput,
  listViewDto: JobSeekerSegmentRoutineListReponse,
  name: 'jobSeekerSegmentRoutine',
  pluralName: 'jobSeekerSegmentRoutines',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerSegmentRoutineMessagePattern);
  }
}
