import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerCityService } from './jobseeker_city.service';
import { CreateJobseekerCityDto } from './dto/create-jobseeker_city.dto';
import { UpdateJobseekerCityDto } from './dto/update-jobseeker_city.dto';

@Controller('jobseeker-city')
export class JobseekerCityController {
  constructor(private readonly jobseekerCityService: JobseekerCityService) {}

  @Post()
  create(@Body() createJobseekerCityDto: CreateJobseekerCityDto) {
    return this.jobseekerCityService.create(createJobseekerCityDto);
  }

  @Get()
  findAll() {
    return this.jobseekerCityService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerCityService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerCityDto: UpdateJobseekerCityDto) {
    return this.jobseekerCityService.update(id, updateJobseekerCityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerCityService.remove(id);
  }
}
