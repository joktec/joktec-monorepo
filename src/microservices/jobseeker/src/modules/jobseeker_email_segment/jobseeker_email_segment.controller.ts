import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerEmailSegmentService } from './jobseeker_email_segment.service';
import { CreateJobseekerEmailSegmentDto } from './dto/create-jobseeker_email_segment.dto';
import { UpdateJobseekerEmailSegmentDto } from './dto/update-jobseeker_email_segment.dto';

@Controller('jobseeker-email-segment')
export class JobseekerEmailSegmentController {
  constructor(private readonly jobseekerEmailSegmentService: JobseekerEmailSegmentService) {}

  @Post()
  create(@Body() createJobseekerEmailSegmentDto: CreateJobseekerEmailSegmentDto) {
    return this.jobseekerEmailSegmentService.create(createJobseekerEmailSegmentDto);
  }

  @Get()
  findAll() {
    return this.jobseekerEmailSegmentService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerEmailSegmentService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerEmailSegmentDto: UpdateJobseekerEmailSegmentDto) {
    return this.jobseekerEmailSegmentService.update(id, updateJobseekerEmailSegmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerEmailSegmentService.remove(id);
  }
}
