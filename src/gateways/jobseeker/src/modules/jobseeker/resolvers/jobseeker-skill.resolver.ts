import { firstValueFrom } from 'rxjs';
import {
  JobSeekerSkillMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerSkillInput,
  UpdateJobSeekerSkillInput,
  JobSeekerSkillQueryInput,
  JobSeekerSkillListReponse,
  JobSeekerSkill,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerSkill)
export class JobSeekerSkillResolver extends BaseResolver<
  CreateJobSeekerSkillInput,
  UpdateJobSeekerSkillInput,
  JobSeekerSkillQueryInput
>({
  viewDto: JobSeekerSkill,
  createInput: CreateJobSeekerSkillInput,
  updateInput: UpdateJobSeekerSkillInput,
  listQueryInput: JobSeekerSkillQueryInput,
  listViewDto: JobSeekerSkillListReponse,
  name: 'jobSeekerSkill',
  pluralName: 'jobSeekerSkills',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerSkillMessagePattern);
  }
}
