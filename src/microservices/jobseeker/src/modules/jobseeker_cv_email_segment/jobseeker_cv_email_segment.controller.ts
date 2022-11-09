import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerCvEmailSegmentService } from './jobseeker_cv_email_segment.service';
import { CreateJobseekerCvEmailSegmentDto } from './dto/create-jobseeker_cv_email_segment.dto';
import { UpdateJobseekerCvEmailSegmentDto } from './dto/update-jobseeker_cv_email_segment.dto';

@Controller('jobseeker-cv-email-segment')
export class JobseekerCvEmailSegmentController {
  constructor(private readonly jobseekerCvEmailSegmentService: JobseekerCvEmailSegmentService) {}

  @Post()
  create(@Body() createJobseekerCvEmailSegmentDto: CreateJobseekerCvEmailSegmentDto) {
    return this.jobseekerCvEmailSegmentService.create(createJobseekerCvEmailSegmentDto);
  }

  @Get()
  findAll() {
    return this.jobseekerCvEmailSegmentService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerCvEmailSegmentService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerCvEmailSegmentDto: UpdateJobseekerCvEmailSegmentDto) {
    return this.jobseekerCvEmailSegmentService.update(id, updateJobseekerCvEmailSegmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerCvEmailSegmentService.remove(id);
  }
}
