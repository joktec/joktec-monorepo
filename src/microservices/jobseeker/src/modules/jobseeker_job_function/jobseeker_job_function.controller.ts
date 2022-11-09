import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerJobFunctionService } from './jobseeker_job_function.service';
import { CreateJobseekerJobFunctionDto } from './dto/create-jobseeker_job_function.dto';
import { UpdateJobseekerJobFunctionDto } from './dto/update-jobseeker_job_function.dto';

@Controller('jobseeker-job-function')
export class JobseekerJobFunctionController {
  constructor(private readonly jobseekerJobFunctionService: JobseekerJobFunctionService) {}

  @Post()
  create(@Body() createJobseekerJobFunctionDto: CreateJobseekerJobFunctionDto) {
    return this.jobseekerJobFunctionService.create(createJobseekerJobFunctionDto);
  }

  @Get()
  findAll() {
    return this.jobseekerJobFunctionService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerJobFunctionService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerJobFunctionDto: UpdateJobseekerJobFunctionDto) {
    return this.jobseekerJobFunctionService.update(id, updateJobseekerJobFunctionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerJobFunctionService.remove(id);
  }
}
