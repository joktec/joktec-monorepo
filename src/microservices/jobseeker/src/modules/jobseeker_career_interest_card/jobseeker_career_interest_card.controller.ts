import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerCareerInterestCardService } from './jobseeker_career_interest_card.service';
import { CreateJobseekerCareerInterestCardDto } from './dto/create-jobseeker_career_interest_card.dto';
import { UpdateJobseekerCareerInterestCardDto } from './dto/update-jobseeker_career_interest_card.dto';

@Controller('jobseeker-career-interest-card')
export class JobseekerCareerInterestCardController {
  constructor(private readonly jobseekerCareerInterestCardService: JobseekerCareerInterestCardService) {}

  @Post()
  create(@Body() createJobseekerCareerInterestCardDto: CreateJobseekerCareerInterestCardDto) {
    return this.jobseekerCareerInterestCardService.create(createJobseekerCareerInterestCardDto);
  }

  @Get()
  findAll() {
    return this.jobseekerCareerInterestCardService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerCareerInterestCardService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerCareerInterestCardDto: UpdateJobseekerCareerInterestCardDto) {
    return this.jobseekerCareerInterestCardService.update(id, updateJobseekerCareerInterestCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerCareerInterestCardService.remove(id);
  }
}
