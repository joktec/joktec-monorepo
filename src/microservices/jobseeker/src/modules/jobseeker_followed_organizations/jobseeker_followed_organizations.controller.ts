import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerFollowedOrganizationsService } from './jobseeker_followed_organizations.service';
import { CreateJobseekerFollowedOrganizationDto } from './dto/create-jobseeker_followed_organization.dto';
import { UpdateJobseekerFollowedOrganizationDto } from './dto/update-jobseeker_followed_organization.dto';

@Controller('jobseeker-followed-organizations')
export class JobseekerFollowedOrganizationsController {
  constructor(private readonly jobseekerFollowedOrganizationsService: JobseekerFollowedOrganizationsService) {}

  @Post()
  create(@Body() createJobseekerFollowedOrganizationDto: CreateJobseekerFollowedOrganizationDto) {
    return this.jobseekerFollowedOrganizationsService.create(createJobseekerFollowedOrganizationDto);
  }

  @Get()
  findAll() {
    return this.jobseekerFollowedOrganizationsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerFollowedOrganizationsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerFollowedOrganizationDto: UpdateJobseekerFollowedOrganizationDto) {
    return this.jobseekerFollowedOrganizationsService.update(id, updateJobseekerFollowedOrganizationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerFollowedOrganizationsService.remove(id);
  }
}
