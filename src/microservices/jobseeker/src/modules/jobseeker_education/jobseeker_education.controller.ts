import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerEducationService } from './jobseeker_education.service';
import { CreateJobseekerEducationDto } from './dto/create-jobseeker_education.dto';
import { UpdateJobseekerEducationDto } from './dto/update-jobseeker_education.dto';

@Controller('jobseeker-education')
export class JobseekerEducationController {
  constructor(private readonly jobseekerEducationService: JobseekerEducationService) {}

  @Post()
  create(@Body() createJobseekerEducationDto: CreateJobseekerEducationDto) {
    return this.jobseekerEducationService.create(createJobseekerEducationDto);
  }

  @Get()
  findAll() {
    return this.jobseekerEducationService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerEducationService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerEducationDto: UpdateJobseekerEducationDto) {
    return this.jobseekerEducationService.update(id, updateJobseekerEducationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerEducationService.remove(id);
  }
}
