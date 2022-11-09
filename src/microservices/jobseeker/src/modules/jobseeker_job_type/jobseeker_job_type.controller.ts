import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerJobTypeService } from './jobseeker_job_type.service';
import { CreateJobseekerJobTypeDto } from './dto/create-jobseeker_job_type.dto';
import { UpdateJobseekerJobTypeDto } from './dto/update-jobseeker_job_type.dto';

@Controller('jobseeker-job-type')
export class JobseekerJobTypeController {
  constructor(private readonly jobseekerJobTypeService: JobseekerJobTypeService) {}

  @Post()
  create(@Body() createJobseekerJobTypeDto: CreateJobseekerJobTypeDto) {
    return this.jobseekerJobTypeService.create(createJobseekerJobTypeDto);
  }

  @Get()
  findAll() {
    return this.jobseekerJobTypeService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerJobTypeService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerJobTypeDto: UpdateJobseekerJobTypeDto) {
    return this.jobseekerJobTypeService.update(id, updateJobseekerJobTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerJobTypeService.remove(id);
  }
}
