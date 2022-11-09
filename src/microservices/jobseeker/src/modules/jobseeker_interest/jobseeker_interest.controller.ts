import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerInterestService } from './jobseeker_interest.service';
import { CreateJobseekerInterestDto } from './dto/create-jobseeker_interest.dto';
import { UpdateJobseekerInterestDto } from './dto/update-jobseeker_interest.dto';

@Controller('jobseeker-interest')
export class JobseekerInterestController {
  constructor(private readonly jobseekerInterestService: JobseekerInterestService) {}

  @Post()
  create(@Body() createJobseekerInterestDto: CreateJobseekerInterestDto) {
    return this.jobseekerInterestService.create(createJobseekerInterestDto);
  }

  @Get()
  findAll() {
    return this.jobseekerInterestService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerInterestService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerInterestDto: UpdateJobseekerInterestDto) {
    return this.jobseekerInterestService.update(id, updateJobseekerInterestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerInterestService.remove(id);
  }
}
