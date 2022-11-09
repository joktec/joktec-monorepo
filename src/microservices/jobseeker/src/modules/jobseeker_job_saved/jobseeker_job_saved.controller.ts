import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerJobSavedService } from './jobseeker_job_saved.service';
import { CreateJobseekerJobSavedDto } from './dto/create-jobseeker_job_saved.dto';
import { UpdateJobseekerJobSavedDto } from './dto/update-jobseeker_job_saved.dto';

@Controller('jobseeker-job-saved')
export class JobseekerJobSavedController {
  constructor(private readonly jobseekerJobSavedService: JobseekerJobSavedService) {}

  @Post()
  create(@Body() createJobseekerJobSavedDto: CreateJobseekerJobSavedDto) {
    return this.jobseekerJobSavedService.create(createJobseekerJobSavedDto);
  }

  @Get()
  findAll() {
    return this.jobseekerJobSavedService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerJobSavedService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerJobSavedDto: UpdateJobseekerJobSavedDto) {
    return this.jobseekerJobSavedService.update(id, updateJobseekerJobSavedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerJobSavedService.remove(id);
  }
}
