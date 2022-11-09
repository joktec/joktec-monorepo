import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerWorkExperienceService } from './jobseeker_work_experience.service';
import { CreateJobseekerWorkExperienceDto } from './dto/create-jobseeker_work_experience.dto';
import { UpdateJobseekerWorkExperienceDto } from './dto/update-jobseeker_work_experience.dto';

@Controller('jobseeker-work-experience')
export class JobseekerWorkExperienceController {
  constructor(private readonly jobseekerWorkExperienceService: JobseekerWorkExperienceService) {}

  @Post()
  create(@Body() createJobseekerWorkExperienceDto: CreateJobseekerWorkExperienceDto) {
    return this.jobseekerWorkExperienceService.create(createJobseekerWorkExperienceDto);
  }

  @Get()
  findAll() {
    return this.jobseekerWorkExperienceService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerWorkExperienceService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerWorkExperienceDto: UpdateJobseekerWorkExperienceDto) {
    return this.jobseekerWorkExperienceService.update(id, updateJobseekerWorkExperienceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerWorkExperienceService.remove(id);
  }
}
