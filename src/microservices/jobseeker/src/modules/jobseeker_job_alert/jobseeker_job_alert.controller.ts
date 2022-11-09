import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerJobAlertService } from './jobseeker_job_alert.service';
import { CreateJobseekerJobAlertDto } from './dto/create-jobseeker_job_alert.dto';
import { UpdateJobseekerJobAlertDto } from './dto/update-jobseeker_job_alert.dto';

@Controller('jobseeker-job-alert')
export class JobseekerJobAlertController {
  constructor(private readonly jobseekerJobAlertService: JobseekerJobAlertService) {}

  @Post()
  create(@Body() createJobseekerJobAlertDto: CreateJobseekerJobAlertDto) {
    return this.jobseekerJobAlertService.create(createJobseekerJobAlertDto);
  }

  @Get()
  findAll() {
    return this.jobseekerJobAlertService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerJobAlertService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerJobAlertDto: UpdateJobseekerJobAlertDto) {
    return this.jobseekerJobAlertService.update(id, updateJobseekerJobAlertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerJobAlertService.remove(id);
  }
}
