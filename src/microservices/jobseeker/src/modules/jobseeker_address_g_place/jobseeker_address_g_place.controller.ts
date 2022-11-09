import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerAddressGPlaceService } from './jobseeker_address_g_place.service';
import { CreateJobseekerAddressGPlaceDto } from './dto/create-jobseeker_address_g_place.dto';
import { UpdateJobseekerAddressGPlaceDto } from './dto/update-jobseeker_address_g_place.dto';

@Controller('jobseeker-address-g-place')
export class JobseekerAddressGPlaceController {
  constructor(private readonly jobseekerAddressGPlaceService: JobseekerAddressGPlaceService) {}

  @Post()
  create(@Body() createJobseekerAddressGPlaceDto: CreateJobseekerAddressGPlaceDto) {
    return this.jobseekerAddressGPlaceService.create(createJobseekerAddressGPlaceDto);
  }

  @Get()
  findAll() {
    return this.jobseekerAddressGPlaceService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerAddressGPlaceService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerAddressGPlaceDto: UpdateJobseekerAddressGPlaceDto) {
    return this.jobseekerAddressGPlaceService.update(id, updateJobseekerAddressGPlaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerAddressGPlaceService.remove(id);
  }
}
