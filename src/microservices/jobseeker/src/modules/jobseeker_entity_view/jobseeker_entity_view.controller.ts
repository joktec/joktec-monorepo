import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerEntityViewService } from './jobseeker_entity_view.service';
import { CreateJobseekerEntityViewDto } from './dto/create-jobseeker_entity_view.dto';
import { UpdateJobseekerEntityViewDto } from './dto/update-jobseeker_entity_view.dto';

@Controller('jobseeker-entity-view')
export class JobseekerEntityViewController {
  constructor(private readonly jobseekerEntityViewService: JobseekerEntityViewService) {}

  @Post()
  create(@Body() createJobseekerEntityViewDto: CreateJobseekerEntityViewDto) {
    return this.jobseekerEntityViewService.create(createJobseekerEntityViewDto);
  }

  @Get()
  findAll() {
    return this.jobseekerEntityViewService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerEntityViewService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerEntityViewDto: UpdateJobseekerEntityViewDto) {
    return this.jobseekerEntityViewService.update(id, updateJobseekerEntityViewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerEntityViewService.remove(id);
  }
}
