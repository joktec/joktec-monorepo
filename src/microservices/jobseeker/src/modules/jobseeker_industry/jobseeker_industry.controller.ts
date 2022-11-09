import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerIndustryService } from './jobseeker_industry.service';
import { CreateJobseekerIndustryDto } from './dto/create-jobseeker_industry.dto';
import { UpdateJobseekerIndustryDto } from './dto/update-jobseeker_industry.dto';

@Controller('jobseeker-industry')
export class JobseekerIndustryController {
  constructor(private readonly jobseekerIndustryService: JobseekerIndustryService) {}

  @Post()
  create(@Body() createJobseekerIndustryDto: CreateJobseekerIndustryDto) {
    return this.jobseekerIndustryService.create(createJobseekerIndustryDto);
  }

  @Get()
  findAll() {
    return this.jobseekerIndustryService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerIndustryService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerIndustryDto: UpdateJobseekerIndustryDto) {
    return this.jobseekerIndustryService.update(id, updateJobseekerIndustryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerIndustryService.remove(id);
  }
}
