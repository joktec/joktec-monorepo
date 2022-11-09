import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerSegmentRoutineDto } from './create-jobseeker_segment_routine.dto';

export class UpdateJobseekerSegmentRoutineDto extends PartialType(CreateJobseekerSegmentRoutineDto) {}
