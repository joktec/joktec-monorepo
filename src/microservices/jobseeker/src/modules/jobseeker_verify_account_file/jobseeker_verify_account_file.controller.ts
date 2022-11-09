import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerVerifyAccountFileService } from './jobseeker_verify_account_file.service';
import { CreateJobseekerVerifyAccountFileDto } from './dto/create-jobseeker_verify_account_file.dto';
import { UpdateJobseekerVerifyAccountFileDto } from './dto/update-jobseeker_verify_account_file.dto';

@Controller('jobseeker-verify-account-file')
export class JobseekerVerifyAccountFileController {
  constructor(private readonly jobseekerVerifyAccountFileService: JobseekerVerifyAccountFileService) {}

  @Post()
  create(@Body() createJobseekerVerifyAccountFileDto: CreateJobseekerVerifyAccountFileDto) {
    return this.jobseekerVerifyAccountFileService.create(createJobseekerVerifyAccountFileDto);
  }

  @Get()
  findAll() {
    return this.jobseekerVerifyAccountFileService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerVerifyAccountFileService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerVerifyAccountFileDto: UpdateJobseekerVerifyAccountFileDto) {
    return this.jobseekerVerifyAccountFileService.update(id, updateJobseekerVerifyAccountFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerVerifyAccountFileService.remove(id);
  }
}
