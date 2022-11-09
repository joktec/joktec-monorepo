import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobseekerVerifyAccountService } from './jobseeker_verify_account.service';
import { CreateJobseekerVerifyAccountDto } from './dto/create-jobseeker_verify_account.dto';
import { UpdateJobseekerVerifyAccountDto } from './dto/update-jobseeker_verify_account.dto';

@Controller('jobseeker-verify-account')
export class JobseekerVerifyAccountController {
  constructor(private readonly jobseekerVerifyAccountService: JobseekerVerifyAccountService) {}

  @Post()
  create(@Body() createJobseekerVerifyAccountDto: CreateJobseekerVerifyAccountDto) {
    return this.jobseekerVerifyAccountService.create(createJobseekerVerifyAccountDto);
  }

  @Get()
  findAll() {
    return this.jobseekerVerifyAccountService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobseekerVerifyAccountService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobseekerVerifyAccountDto: UpdateJobseekerVerifyAccountDto) {
    return this.jobseekerVerifyAccountService.update(id, updateJobseekerVerifyAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobseekerVerifyAccountService.remove(id);
  }
}
