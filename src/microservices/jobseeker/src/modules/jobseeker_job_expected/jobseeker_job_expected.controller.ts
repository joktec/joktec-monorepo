import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerJobExpectedService } from './jobseeker_job_expected.service';
import { CreateJobseekerJobExpectedDto } from './dto/create-jobseeker_job_expected.dto';
import { UpdateJobseekerJobExpectedDto } from './dto/update-jobseeker_job_expected.dto';

@Controller('jobseeker-job-expected')
export class JobseekerJobExpectedController {
  constructor(private readonly jobseekerJobExpectedService: JobseekerJobExpectedService) {}

  @Post()
  create(@Body() createJobseekerJobExpectedDto: CreateJobseekerJobExpectedDto) {
    return this.jobseekerJobExpectedService.create(createJobseekerJobExpectedDto);
  }

  @Get()
  findAll() {
    return this.jobseekerJobExpectedService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerJobExpectedService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerJobExpectedDto: UpdateJobseekerJobExpectedDto) {
    return this.jobseekerJobExpectedService.update(id, updateJobseekerJobExpectedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerJobExpectedService.remove(id);
  }
}
