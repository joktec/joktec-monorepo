import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerMarketValueService } from './jobseeker_market_value.service';
import { CreateJobseekerMarketValueDto } from './dto/create-jobseeker_market_value.dto';
import { UpdateJobseekerMarketValueDto } from './dto/update-jobseeker_market_value.dto';

@Controller('jobseeker-market-value')
export class JobseekerMarketValueController {
  constructor(private readonly jobseekerMarketValueService: JobseekerMarketValueService) {}

  @Post()
  create(@Body() createJobseekerMarketValueDto: CreateJobseekerMarketValueDto) {
    return this.jobseekerMarketValueService.create(createJobseekerMarketValueDto);
  }

  @Get()
  findAll() {
    return this.jobseekerMarketValueService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerMarketValueService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerMarketValueDto: UpdateJobseekerMarketValueDto) {
    return this.jobseekerMarketValueService.update(id, updateJobseekerMarketValueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerMarketValueService.remove(id);
  }
}
