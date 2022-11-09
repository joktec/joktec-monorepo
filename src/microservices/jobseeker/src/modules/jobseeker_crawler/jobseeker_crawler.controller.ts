import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerCrawlerService } from './jobseeker_crawler.service';
import { CreateJobseekerCrawlerDto } from './dto/create-jobseeker_crawler.dto';
import { UpdateJobseekerCrawlerDto } from './dto/update-jobseeker_crawler.dto';

@Controller('jobseeker-crawler')
export class JobseekerCrawlerController {
  constructor(private readonly jobseekerCrawlerService: JobseekerCrawlerService) {}

  @Post()
  create(@Body() createJobseekerCrawlerDto: CreateJobseekerCrawlerDto) {
    return this.jobseekerCrawlerService.create(createJobseekerCrawlerDto);
  }

  @Get()
  findAll() {
    return this.jobseekerCrawlerService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerCrawlerService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerCrawlerDto: UpdateJobseekerCrawlerDto) {
    return this.jobseekerCrawlerService.update(id, updateJobseekerCrawlerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerCrawlerService.remove(id);
  }
}
