import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerEntityViewDto } from './create-jobseeker_entity_view.dto';

export class UpdateJobseekerEntityViewDto extends PartialType(CreateJobseekerEntityViewDto) {}
