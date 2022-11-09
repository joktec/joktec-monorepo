import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerReferenceService } from './jobseeker_reference.service';
import { CreateJobseekerReferenceDto } from './dto/create-jobseeker_reference.dto';
import { UpdateJobseekerReferenceDto } from './dto/update-jobseeker_reference.dto';

@Controller('jobseeker-reference')
export class JobseekerReferenceController {
  constructor(private readonly jobseekerReferenceService: JobseekerReferenceService) {}

  @Post()
  create(@Body() createJobseekerReferenceDto: CreateJobseekerReferenceDto) {
    return this.jobseekerReferenceService.create(createJobseekerReferenceDto);
  }

  @Get()
  findAll() {
    return this.jobseekerReferenceService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerReferenceService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerReferenceDto: UpdateJobseekerReferenceDto) {
    return this.jobseekerReferenceService.update(id, updateJobseekerReferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerReferenceService.remove(id);
  }
}
