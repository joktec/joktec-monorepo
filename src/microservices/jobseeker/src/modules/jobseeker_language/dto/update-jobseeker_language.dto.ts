import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerLanguageDto } from './create-jobseeker_language.dto';

export class UpdateJobseekerLanguageDto extends PartialType(CreateJobseekerLanguageDto) {}
