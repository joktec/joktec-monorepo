import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerLanguageService } from './jobseeker_language.service';
import { CreateJobseekerLanguageDto } from './dto/create-jobseeker_language.dto';
import { UpdateJobseekerLanguageDto } from './dto/update-jobseeker_language.dto';

@Controller('jobseeker-language')
export class JobseekerLanguageController {
  constructor(private readonly jobseekerLanguageService: JobseekerLanguageService) {}

  @Post()
  create(@Body() createJobseekerLanguageDto: CreateJobseekerLanguageDto) {
    return this.jobseekerLanguageService.create(createJobseekerLanguageDto);
  }

  @Get()
  findAll() {
    return this.jobseekerLanguageService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerLanguageService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerLanguageDto: UpdateJobseekerLanguageDto) {
    return this.jobseekerLanguageService.update(id, updateJobseekerLanguageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerLanguageService.remove(id);
  }
}
