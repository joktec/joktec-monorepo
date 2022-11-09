import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerLevelExpectedService } from './jobseeker_level_expected.service';
import { CreateJobseekerLevelExpectedDto } from './dto/create-jobseeker_level_expected.dto';
import { UpdateJobseekerLevelExpectedDto } from './dto/update-jobseeker_level_expected.dto';

@Controller('jobseeker-level-expected')
export class JobseekerLevelExpectedController {
  constructor(private readonly jobseekerLevelExpectedService: JobseekerLevelExpectedService) {}

  @Post()
  create(@Body() createJobseekerLevelExpectedDto: CreateJobseekerLevelExpectedDto) {
    return this.jobseekerLevelExpectedService.create(createJobseekerLevelExpectedDto);
  }

  @Get()
  findAll() {
    return this.jobseekerLevelExpectedService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerLevelExpectedService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerLevelExpectedDto: UpdateJobseekerLevelExpectedDto) {
    return this.jobseekerLevelExpectedService.update(id, updateJobseekerLevelExpectedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerLevelExpectedService.remove(id);
  }
}
