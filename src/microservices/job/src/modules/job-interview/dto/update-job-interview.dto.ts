import { PartialType } from '@nestjs/mapped-types';
import { CreateJobInterviewDto } from './create-job-interview.dto';

export class UpdateJobInterviewDto extends PartialType(CreateJobInterviewDto) {}
