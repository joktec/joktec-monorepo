import {
  BaseMicroserviceController,
  JobSeekerMessagePattern,
  UserMessagePattern,
  UserMicroserviceConfig,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JobseekerService } from './jobseeker.service';

const userMicroserviceConfig = new UserMicroserviceConfig();

@Controller('jobseeker')
export class JobseekerController extends BaseMicroserviceController(
  JobSeekerMessagePattern,
) {
  constructor(
    private readonly jobseekerService: JobseekerService,
    @Inject(userMicroserviceConfig.name)
    private readonly userMicroservice: ClientProxy,
  ) {
    super(jobseekerService);
  }

  @MessagePattern(JobSeekerMessagePattern.LIST)
  async query(params: any) {
    const { condition, pagination } = params;
    const data = await this.baseService.query(condition, pagination);
    const usersData = await firstValueFrom(
      this.userMicroservice.send(UserMessagePattern.LIST, {
        condition: {
          username: data?.items?.map((it) => it.username),
        },
      }),
    );
    data.items = data.items.map((it) => {
      const user = usersData?.items?.find((u) => u.username === it.username);
      it.firstName = user?.firstName;
      it.lastName = user?.lastName;
      it.avatar = user?.avatar;
      return it;
    });
    return data;
  }

  @MessagePattern(JobSeekerMessagePattern.GET_BY_USERNAME)
  async getJobSeekerByUserName(params: { username: string }) {
    try {
      const { username } = params;
      const jobseeker = await this.baseService.findOneBy({ username });

      if (!jobseeker) {
        throw new RpcException('JobSeeker not found');
      }

      return jobseeker;
    } catch (err) {
      throw new RpcException(err.message);
    }
  }
}
