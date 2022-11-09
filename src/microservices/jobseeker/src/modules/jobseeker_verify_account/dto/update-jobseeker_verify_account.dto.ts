import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerVerifyAccountDto } from './create-jobseeker_verify_account.dto';

export class UpdateJobseekerVerifyAccountDto extends PartialType(CreateJobseekerVerifyAccountDto) {}
