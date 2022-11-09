import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerSkillService } from './jobseeker_skill.service';
import { CreateJobseekerSkillDto } from './dto/create-jobseeker_skill.dto';
import { UpdateJobseekerSkillDto } from './dto/update-jobseeker_skill.dto';

@Controller('jobseeker-skill')
export class JobseekerSkillController {
  constructor(private readonly jobseekerSkillService: JobseekerSkillService) {}

  @Post()
  create(@Body() createJobseekerSkillDto: CreateJobseekerSkillDto) {
    return this.jobseekerSkillService.create(createJobseekerSkillDto);
  }

  @Get()
  findAll() {
    return this.jobseekerSkillService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerSkillService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerSkillDto: UpdateJobseekerSkillDto) {
    return this.jobseekerSkillService.update(id, updateJobseekerSkillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerSkillService.remove(id);
  }
}
