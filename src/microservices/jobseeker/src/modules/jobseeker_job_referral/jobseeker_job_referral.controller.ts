import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerJobReferralService } from './jobseeker_job_referral.service';
import { CreateJobseekerJobReferralDto } from './dto/create-jobseeker_job_referral.dto';
import { UpdateJobseekerJobReferralDto } from './dto/update-jobseeker_job_referral.dto';

@Controller('jobseeker-job-referral')
export class JobseekerJobReferralController {
  constructor(private readonly jobseekerJobReferralService: JobseekerJobReferralService) {}

  @Post()
  create(@Body() createJobseekerJobReferralDto: CreateJobseekerJobReferralDto) {
    return this.jobseekerJobReferralService.create(createJobseekerJobReferralDto);
  }

  @Get()
  findAll() {
    return this.jobseekerJobReferralService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerJobReferralService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerJobReferralDto: UpdateJobseekerJobReferralDto) {
    return this.jobseekerJobReferralService.update(id, updateJobseekerJobReferralDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerJobReferralService.remove(id);
  }
}
