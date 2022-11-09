import { BaseService } from './../../service/base.service';
import { Inject, Injectable } from '@nestjs/common';
import { Jobseeker } from './entities/jobseeker.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class JobseekerService extends BaseService<Jobseeker> {
  constructor(
    @InjectRepository(Jobseeker)
    private jobseekerRepository: Repository<Jobseeker>,
    @Inject(UsersService)
    private usersService: UsersService,
  ) {
    super(jobseekerRepository);
  }

  async getByUserId(userId: string) {
    const userInfo = await this.usersService.findOne({ userId });
    if (!userInfo) {
      new Error('User not found');
    }
    const jobseekerInfo = await this.findOne({
      username: userInfo.username,
    });
    if (!jobseekerInfo) {
      new Error('Jobseeker not found');
    }
    return jobseekerInfo;
  }
}
