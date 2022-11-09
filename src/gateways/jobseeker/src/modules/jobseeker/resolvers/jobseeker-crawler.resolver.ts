import { firstValueFrom } from 'rxjs';
import {
  JobSeekerCrawlerMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerCrawlerInput,
  UpdateJobSeekerCrawlerInput,
  JobSeekerCrawlerQueryInput,
  JobSeekerCrawlerListReponse,
  JobSeekerCrawler,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerCrawler)
export class JobSeekerCrawlerResolver extends BaseResolver<
  CreateJobSeekerCrawlerInput,
  UpdateJobSeekerCrawlerInput,
  JobSeekerCrawlerQueryInput
>({
  viewDto: JobSeekerCrawler,
  createInput: CreateJobSeekerCrawlerInput,
  updateInput: UpdateJobSeekerCrawlerInput,
  listQueryInput: JobSeekerCrawlerQueryInput,
  listViewDto: JobSeekerCrawlerListReponse,
  name: 'jobSeekerCrawler',
  pluralName: 'jobSeekerCrawlers',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerCrawlerMessagePattern);
  }
}
