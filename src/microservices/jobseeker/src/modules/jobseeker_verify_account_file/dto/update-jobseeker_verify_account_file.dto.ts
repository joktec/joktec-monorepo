import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerVerifyAccountFileDto } from './create-jobseeker_verify_account_file.dto';

export class UpdateJobseekerVerifyAccountFileDto extends PartialType(CreateJobseekerVerifyAccountFileDto) {}
