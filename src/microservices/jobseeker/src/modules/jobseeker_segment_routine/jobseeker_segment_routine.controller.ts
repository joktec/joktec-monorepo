import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerSegmentRoutineService } from './jobseeker_segment_routine.service';
import { CreateJobseekerSegmentRoutineDto } from './dto/create-jobseeker_segment_routine.dto';
import { UpdateJobseekerSegmentRoutineDto } from './dto/update-jobseeker_segment_routine.dto';

@Controller('jobseeker-segment-routine')
export class JobseekerSegmentRoutineController {
  constructor(private readonly jobseekerSegmentRoutineService: JobseekerSegmentRoutineService) {}

  @Post()
  create(@Body() createJobseekerSegmentRoutineDto: CreateJobseekerSegmentRoutineDto) {
    return this.jobseekerSegmentRoutineService.create(createJobseekerSegmentRoutineDto);
  }

  @Get()
  findAll() {
    return this.jobseekerSegmentRoutineService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerSegmentRoutineService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerSegmentRoutineDto: UpdateJobseekerSegmentRoutineDto) {
    return this.jobseekerSegmentRoutineService.update(id, updateJobseekerSegmentRoutineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerSegmentRoutineService.remove(id);
  }
}
