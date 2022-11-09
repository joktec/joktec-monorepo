import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerActivityDateService } from './jobseeker_activity_date.service';
import { CreateJobseekerActivityDateDto } from './dto/create-jobseeker_activity_date.dto';
import { UpdateJobseekerActivityDateDto } from './dto/update-jobseeker_activity_date.dto';

@Controller('jobseeker-activity-date')
export class JobseekerActivityDateController {
  constructor(private readonly jobseekerActivityDateService: JobseekerActivityDateService) {}

  @Post()
  create(@Body() createJobseekerActivityDateDto: CreateJobseekerActivityDateDto) {
    return this.jobseekerActivityDateService.create(createJobseekerActivityDateDto);
  }

  @Get()
  findAll() {
    return this.jobseekerActivityDateService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerActivityDateService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerActivityDateDto: UpdateJobseekerActivityDateDto) {
    return this.jobseekerActivityDateService.update(id, updateJobseekerActivityDateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerActivityDateService.remove(id);
  }
}
