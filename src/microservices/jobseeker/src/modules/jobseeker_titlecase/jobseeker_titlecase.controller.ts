import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerTitlecaseService } from './jobseeker_titlecase.service';
import { CreateJobseekerTitlecaseDto } from './dto/create-jobseeker_titlecase.dto';
import { UpdateJobseekerTitlecaseDto } from './dto/update-jobseeker_titlecase.dto';

@Controller('jobseeker-titlecase')
export class JobseekerTitlecaseController {
  constructor(private readonly jobseekerTitlecaseService: JobseekerTitlecaseService) {}

  @Post()
  create(@Body() createJobseekerTitlecaseDto: CreateJobseekerTitlecaseDto) {
    return this.jobseekerTitlecaseService.create(createJobseekerTitlecaseDto);
  }

  @Get()
  findAll() {
    return this.jobseekerTitlecaseService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerTitlecaseService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerTitlecaseDto: UpdateJobseekerTitlecaseDto) {
    return this.jobseekerTitlecaseService.update(id, updateJobseekerTitlecaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerTitlecaseService.remove(id);
  }
}
