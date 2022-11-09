import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerRecommendationJobsService } from './jobseeker_recommendation_jobs.service';
import { CreateJobseekerRecommendationJobDto } from './dto/create-jobseeker_recommendation_job.dto';
import { UpdateJobseekerRecommendationJobDto } from './dto/update-jobseeker_recommendation_job.dto';

@Controller('jobseeker-recommendation-jobs')
export class JobseekerRecommendationJobsController {
  constructor(private readonly jobseekerRecommendationJobsService: JobseekerRecommendationJobsService) {}

  @Post()
  create(@Body() createJobseekerRecommendationJobDto: CreateJobseekerRecommendationJobDto) {
    return this.jobseekerRecommendationJobsService.create(createJobseekerRecommendationJobDto);
  }

  @Get()
  findAll() {
    return this.jobseekerRecommendationJobsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerRecommendationJobsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerRecommendationJobDto: UpdateJobseekerRecommendationJobDto) {
    return this.jobseekerRecommendationJobsService.update(id, updateJobseekerRecommendationJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerRecommendationJobsService.remove(id);
  }
}
