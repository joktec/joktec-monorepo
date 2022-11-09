import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerDistrictService } from './jobseeker_district.service';
import { CreateJobseekerDistrictDto } from './dto/create-jobseeker_district.dto';
import { UpdateJobseekerDistrictDto } from './dto/update-jobseeker_district.dto';

@Controller('jobseeker-district')
export class JobseekerDistrictController {
  constructor(private readonly jobseekerDistrictService: JobseekerDistrictService) {}

  @Post()
  create(@Body() createJobseekerDistrictDto: CreateJobseekerDistrictDto) {
    return this.jobseekerDistrictService.create(createJobseekerDistrictDto);
  }

  @Get()
  findAll() {
    return this.jobseekerDistrictService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerDistrictService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerDistrictDto: UpdateJobseekerDistrictDto) {
    return this.jobseekerDistrictService.update(id, updateJobseekerDistrictDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerDistrictService.remove(id);
  }
}
