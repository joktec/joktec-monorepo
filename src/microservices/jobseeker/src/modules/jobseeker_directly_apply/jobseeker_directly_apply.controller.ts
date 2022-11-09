import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerDirectlyApplyService } from './jobseeker_directly_apply.service';
import { CreateJobseekerDirectlyApplyDto } from './dto/create-jobseeker_directly_apply.dto';
import { UpdateJobseekerDirectlyApplyDto } from './dto/update-jobseeker_directly_apply.dto';

@Controller('jobseeker-directly-apply')
export class JobseekerDirectlyApplyController {
  constructor(private readonly jobseekerDirectlyApplyService: JobseekerDirectlyApplyService) {}

  @Post()
  create(@Body() createJobseekerDirectlyApplyDto: CreateJobseekerDirectlyApplyDto) {
    return this.jobseekerDirectlyApplyService.create(createJobseekerDirectlyApplyDto);
  }

  @Get()
  findAll() {
    return this.jobseekerDirectlyApplyService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerDirectlyApplyService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerDirectlyApplyDto: UpdateJobseekerDirectlyApplyDto) {
    return this.jobseekerDirectlyApplyService.update(id, updateJobseekerDirectlyApplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerDirectlyApplyService.remove(id);
  }
}
