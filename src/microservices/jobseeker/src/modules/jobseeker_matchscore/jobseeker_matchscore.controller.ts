import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerMatchscoreService } from './jobseeker_matchscore.service';
import { CreateJobseekerMatchscoreDto } from './dto/create-jobseeker_matchscore.dto';
import { UpdateJobseekerMatchscoreDto } from './dto/update-jobseeker_matchscore.dto';

@Controller('jobseeker-matchscore')
export class JobseekerMatchscoreController {
  constructor(private readonly jobseekerMatchscoreService: JobseekerMatchscoreService) {}

  @Post()
  create(@Body() createJobseekerMatchscoreDto: CreateJobseekerMatchscoreDto) {
    return this.jobseekerMatchscoreService.create(createJobseekerMatchscoreDto);
  }

  @Get()
  findAll() {
    return this.jobseekerMatchscoreService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerMatchscoreService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerMatchscoreDto: UpdateJobseekerMatchscoreDto) {
    return this.jobseekerMatchscoreService.update(id, updateJobseekerMatchscoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerMatchscoreService.remove(id);
  }
}
