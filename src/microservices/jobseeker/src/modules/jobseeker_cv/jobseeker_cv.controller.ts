import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerCvService } from './jobseeker_cv.service';
import { CreateJobseekerCvDto } from './dto/create-jobseeker_cv.dto';
import { UpdateJobseekerCvDto } from './dto/update-jobseeker_cv.dto';

@Controller('jobseeker-cv')
export class JobseekerCvController {
  constructor(private readonly jobseekerCvService: JobseekerCvService) {}

  @Post()
  create(@Body() createJobseekerCvDto: CreateJobseekerCvDto) {
    return this.jobseekerCvService.create(createJobseekerCvDto);
  }

  @Get()
  findAll() {
    return this.jobseekerCvService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerCvService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerCvDto: UpdateJobseekerCvDto) {
    return this.jobseekerCvService.update(id, updateJobseekerCvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerCvService.remove(id);
  }
}
