import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerLocationService } from './jobseeker_location.service';
import { CreateJobseekerLocationDto } from './dto/create-jobseeker_location.dto';
import { UpdateJobseekerLocationDto } from './dto/update-jobseeker_location.dto';

@Controller('jobseeker-location')
export class JobseekerLocationController {
  constructor(private readonly jobseekerLocationService: JobseekerLocationService) {}

  @Post()
  create(@Body() createJobseekerLocationDto: CreateJobseekerLocationDto) {
    return this.jobseekerLocationService.create(createJobseekerLocationDto);
  }

  @Get()
  findAll() {
    return this.jobseekerLocationService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerLocationService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerLocationDto: UpdateJobseekerLocationDto) {
    return this.jobseekerLocationService.update(id, updateJobseekerLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerLocationService.remove(id);
  }
}
