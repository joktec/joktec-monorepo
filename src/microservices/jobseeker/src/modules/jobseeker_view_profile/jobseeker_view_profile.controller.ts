import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerViewProfileService } from './jobseeker_view_profile.service';
import { CreateJobseekerViewProfileDto } from './dto/create-jobseeker_view_profile.dto';
import { UpdateJobseekerViewProfileDto } from './dto/update-jobseeker_view_profile.dto';

@Controller('jobseeker-view-profile')
export class JobseekerViewProfileController {
  constructor(private readonly jobseekerViewProfileService: JobseekerViewProfileService) {}

  @Post()
  create(@Body() createJobseekerViewProfileDto: CreateJobseekerViewProfileDto) {
    return this.jobseekerViewProfileService.create(createJobseekerViewProfileDto);
  }

  @Get()
  findAll() {
    return this.jobseekerViewProfileService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerViewProfileService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerViewProfileDto: UpdateJobseekerViewProfileDto) {
    return this.jobseekerViewProfileService.update(id, updateJobseekerViewProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerViewProfileService.remove(id);
  }
}
