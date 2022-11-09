import { firstValueFrom } from 'rxjs';
import {
  AuthMessagePattern,
  AuthMicroserviceConfig,
  JobSeekerMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const authMicroserviceConfig = new AuthMicroserviceConfig();
const jobseekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Injectable()
export class AppService {
  constructor(
    @Inject(authMicroserviceConfig.name)
    private readonly authMicroservice: ClientProxy,
    @Inject(jobseekerMicroserviceConfig.name)
    private readonly jobseekerService: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getJobseekerByUserId(userId: string) {
    const userProfile = await firstValueFrom(
      this.authMicroservice.send(AuthMessagePattern.GET_PROFILE, {
        id: userId,
      }),
    );

    const jobseekerInfo = await firstValueFrom(
      this.jobseekerService.send(JobSeekerMessagePattern.GET_BY_USERNAME, {
        username: userProfile.username,
      }),
    );

    return jobseekerInfo;
  }
}
