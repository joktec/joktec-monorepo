import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerAwardService } from './jobseeker_award.service';
import { CreateJobseekerAwardDto } from './dto/create-jobseeker_award.dto';
import { UpdateJobseekerAwardDto } from './dto/update-jobseeker_award.dto';

@Controller('jobseeker-award')
export class JobseekerAwardController {
  constructor(private readonly jobseekerAwardService: JobseekerAwardService) {}

  @Post()
  create(@Body() createJobseekerAwardDto: CreateJobseekerAwardDto) {
    return this.jobseekerAwardService.create(createJobseekerAwardDto);
  }

  @Get()
  findAll() {
    return this.jobseekerAwardService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerAwardService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerAwardDto: UpdateJobseekerAwardDto) {
    return this.jobseekerAwardService.update(id, updateJobseekerAwardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerAwardService.remove(id);
  }
}
